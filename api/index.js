import express from "express";
const app = express();
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// MIDDLEWARES
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relationships", relationshipRoutes); // <--- 2. ROUTE ADDED BACK

// TEST ROUTE
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is responsive" });
});

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});