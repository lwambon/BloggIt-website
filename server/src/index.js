import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  signinUser,
  updateUserInformation,
} from "./controllers/users.controllers.js";
import { loginUsers, updatePassword } from "./controllers/auth.controllers.js";
import validateUserInfo from "./middleware/validateUserInformation.js";
import {
  createBlog,
  fetchingSingleBlog,
  fetchingAllBlogs,
  getUsersBlogs,
  deleteBlog,
  updateBlog,
} from "./controllers/blogs.controllers.js";
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

//updating users information
app.put("/users/:userId", verifyToken, updateUserInformation);
// Login users
app.post("/auth/login", loginUsers);
// updating passwords
app.patch("/auth/password", verifyToken, updatePassword);
//creating a blog
app.post("/blogs", verifyToken, validateBlog, createBlog);
//getting users blogs
app.get("/blogs/users", verifyToken, getUsersBlogs);
//fetching a single note
app.get("/blogs/:id", verifyToken, fetchingSingleBlog);
//fetching all notes
app.get("/blogs", verifyToken, fetchingAllBlogs);

//deleteing a blog
app.delete("/blogs/:blogId", verifyToken, deleteBlog);
//updating a blog
app.put("/blogs/:blogId", verifyToken, validateBlog, updateBlog);

app.listen(4000, () => {
  console.log("Server running successfully");
});
