import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const Client = new PrismaClient();
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, userName, emailAddress, password } = req.body;

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
