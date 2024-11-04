import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { signinUser } from "./controllers/users.controllers.js";
import { loginUsers } from "./controllers/auth.controllers.js";
import validateUserInfo from "./middleware/validateUserInformation.js";
import { createBlog } from "./controllers/blogs.controllers.js";
import verifyToken from "./middleware/verifyToken.js";
import validateBlog from "./middleware/validateBlog.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());

//signin in users
app.post("/users", validateUserInfo, signinUser);

// Login users
app.post("/auth/login", loginUsers);
//creating a blog
app.post("/blogs", verifyToken, validateBlog, createBlog);

app.listen(4000, () => {
  console.log("Server running successfully");
});
