import express from "express";
import cors from "cors";
import { signinUser } from "./controllers/users.controllers.js";
import { loginUsers } from "./controllers/auth.controllers.js";
import validateUserInfo from "./middleware/validateUserInformation.js";

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

app.post("/users", validateUserInfo, signinUser);

// Login users
app.post("/auth/login", loginUsers);

app.listen(4000, () => {
  console.log("Server running successfully");
});
