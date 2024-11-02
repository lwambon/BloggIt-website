import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  }),
);
const Client = new PrismaClient();
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, userName, emailAddress, password } = req.body;

    if (!firstName) {
      res.status(400).json({ message: "first name is required" });
      return;
    }
    if (!lastName) {
      res.status(400).json({ message: "last name is required" });
      return;
    }
    if (!userName) {
      res.status(400).json({ message: "user name is required" });
      return;
    }
    if (!emailAddress) {
      res.status(400).json({ message: "email address is required" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "password is required" });
      return;
    }

    const userWithEmail = await Client.users.findFirst({
      where: { emailAddress: emailAddress },
    });
    if (userWithEmail) {
      res.status(400).json({ message: "email address already taken" });
      return;
    }

    const userWithuserName = await Client.users.findFirst({
      where: { userName: userName },
    });
    if (userWithuserName) {
      res.status(400).json({ message: "userName  address already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await Client.users.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

//login users in
app.post("/auth/login", async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    console.log(`Email: ${emailAddress}, Password: ${password}`);

    const user = await Client.users.findFirst({
      where: { emailAddress: emailAddress },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong email address or password" });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res
        .status(401)
        .json({ message: "Wrong email address or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    //send response as cookie
    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
});

app.listen(4000, () => {
  console.log("server running succesfully");
});
