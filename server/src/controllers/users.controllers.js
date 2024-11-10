import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const Client = new PrismaClient();

export const signinUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      emailAddress,
      password,
      profilePicture,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await Client.users.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        profilePicture,
        password: hashedPassword,
      },
    });
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUserInformation = async (req, res) => {
  try {
    const { firstName, lastName, userName, emailAddress, profilePicture } =
      req.body;
    const userId = req.userId;
    console.log(userId);
    const user = await Client.users.update({
      where: {
        id: userId,
      },
      data: { firstName, lastName, userName, emailAddress, profilePicture },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
