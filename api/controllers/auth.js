import bcrypt from "bcrypt";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // 1. CHECK IF USER EXISTS
  const qCheck = "SELECT username FROM users WHERE username = ?";

  db.query(qCheck, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // 2. CREATE NEW USER
    // HASH THE PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // CATATAN: Pastikan untuk menyertakan `name` jika ada di frontend dan tabel Anda.
    // Jika ada kolom `name` di tabel, pastikan qInsert menjadi:
    // "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)"
    const qInsert =
      "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hashedPassword];

    db.query(qInsert, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) return res.status(400).json("Wrong password!");

    // >>> LOGIKA BERIKUT DIPINDAHKAN KE DALAM CALLBACK db.query <<<

    // 1. Buat Token JWT
    // Menggunakan data[0].id (kolom id dari database)
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    // 2. Pisahkan password sebelum mengirim respons
    const { password, ...others } = data[0];

    // 3. Set Cookie dan Kirim Respons Sukses
    res
      .cookie("accessToken", token, {
        httpOnly: true, // Tidak dapat diakses oleh client-side JavaScript
      })
      .status(200)
      .json(others); // Kirim data pengguna (tanpa password)
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
