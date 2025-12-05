import express from "express";
import { db } from "./db.js";
const app = express();
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";

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
app.use("/api/relationships", relationshipRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relationships", relationshipRoutes);

// TEST ROUTE
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is responsive" });
});



app.get("/api/setup", (req, res) => {
  const dropLikes = "DROP TABLE IF EXISTS likes";
  const dropComments = "DROP TABLE IF EXISTS comments";
  const dropRelationships = "DROP TABLE IF EXISTS relationships";
  const dropPosts = "DROP TABLE IF EXISTS posts";

  const qPosts = "CREATE TABLE IF NOT EXISTS posts (`id` INT AUTO_INCREMENT PRIMARY KEY, `desc` VARCHAR(200), `img` VARCHAR(200), `userId` INT NOT NULL, `createdAt` DATETIME, FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)";
  const qComments = "CREATE TABLE IF NOT EXISTS comments (`id` INT AUTO_INCREMENT PRIMARY KEY, `desc` VARCHAR(200), `createdAt` DATETIME, `userId` INT NOT NULL, `postId` INT NOT NULL, FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE)";
  const qLikes = "CREATE TABLE IF NOT EXISTS likes (`id` INT AUTO_INCREMENT PRIMARY KEY, `userId` INT NOT NULL, `postId` INT NOT NULL, FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE)";
  const qRelationships = "CREATE TABLE IF NOT EXISTS relationships (`id` INT AUTO_INCREMENT PRIMARY KEY, `followerUserId` INT NOT NULL, `followedUserId` INT NOT NULL, FOREIGN KEY (followerUserId) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (followedUserId) REFERENCES users(id) ON DELETE CASCADE)";

  db.query(dropLikes, (err) => {
    if (err) return res.send(err);
    db.query(dropComments, (err) => {
      if (err) return res.send(err);
      db.query(dropRelationships, (err) => {
        if (err) return res.send(err);
        db.query(dropPosts, (err) => {
          if (err) return res.send(err);
          // Create tables
          db.query(qPosts, (err) => {
            if (err) return res.send(err);
            db.query(qComments, (err) => {
              if (err) return res.send(err);
              db.query(qLikes, (err) => {
                if (err) return res.send(err);
                db.query(qRelationships, (err) => {
                  if (err) return res.send(err);
                  res.send("Database tables dropped and re-created successfully!");
                });
              });
            });
          });
        });
      });
    });
  });
});

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});