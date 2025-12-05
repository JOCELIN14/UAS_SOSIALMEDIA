import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

// Get all users (suggestions)
router.get("/", getUsers);

// Jalur untuk mencari user berdasarkan ID (dipakai Frontend di baris 27)
router.get("/find/:userId", getUser);

// Jalur untuk update profile
router.put("/", updateUser);

// Jalur untuk hapus akun (dipakai tombol Delete kita tadi)
router.delete("/", deleteUser);

export default router;