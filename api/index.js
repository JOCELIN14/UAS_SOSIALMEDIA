import express from "express";
const app = express();
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthContext } from "../client/src/context/authContext.js";

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is responsive" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import { AuthContext } from "./context/authContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
