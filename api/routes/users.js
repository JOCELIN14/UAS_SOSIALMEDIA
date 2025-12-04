import express from "express";
import { getUsers, searchUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search", searchUsers); // <--- The Search Route

export default router;
