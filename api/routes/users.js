import express from "express";
import { getUser, updateUser, deleteUser, searchUsers } from "../controllers/users.js";

const router = express.Router();

// Jalur untuk mencari user berdasarkan ID (dipakai Frontend di baris 27)
router.get("/find/:userId", getUser);

// Jalur untuk pencarian user (New Feature)
router.get("/search", searchUsers);

// Jalur untuk update profile
router.put("/", updateUser);

// Jalur untuk hapus akun (dipakai tombol Delete kita tadi)
router.delete("/", deleteUser);

export default router;