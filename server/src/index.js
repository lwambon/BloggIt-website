import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
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

    const userWithEmail = await client.user.FindFirst({
      where: { emailAddress: emailAddress },
    });
    if (userWithEmail) {
      res.status(400).json({ message: "email address already taken" });
      return;
    }

    const userWithuserName = await client.user.FindFirst({
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

app.listen(4000, () => {
  console.log("server running succesfully");
});
