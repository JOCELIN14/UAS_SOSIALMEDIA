import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Pastikan import ini ada!

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

// --- INI FUNGSI UPDATE YANG SUDAH DI-UPGRADE ---
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Logika Pintar: Cek apakah user mengisi kolom password?
    let q = "";
    let values = [];

    if (req.body.password) {
        // JIKA GANTI PASSWORD: Kita enkripsi dulu password barunya
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Update Nama, Kota, Website, DAN Password
        q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`password`=? WHERE id=?";
        values = [req.body.name, req.body.city, req.body.website, hash, userInfo.id];
    } else {
        // JIKA TIDAK GANTI PASSWORD: Update data diri saja
        q = "UPDATE users SET `name`=?,`city`=?,`website`=? WHERE id=?";
        values = [req.body.name, req.body.city, req.body.website, userInfo.id];
    }

    db.query(q, values, (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your account!");
    });
  });
};

export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM users WHERE id=?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("User has been deleted.");
      return res.status(403).json("You can delete only your account!");
    });
  });
};