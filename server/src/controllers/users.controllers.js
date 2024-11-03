import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const Client = new PrismaClient();

export const signinUser = async (req, res) => {
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
    res.status(500).json({ message: "Something went wrong" });
  }
};
