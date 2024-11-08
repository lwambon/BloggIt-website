import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export const loginUsers = async (req, res) => {
  try {
    const { emailAddress, userName, password } = req.body;

    // Query database for the user with either username or email address
    const user = await client.users.findFirst({
      where: {
        OR: [{ userName: userName }, { emailAddress: emailAddress }],
      },
    });

    // Check if user does not exist
    if (!user) {
      res
        .status(402)
        .json({ message: "Incorrect email address, username, or password." });
      return;
    }

    // If user exists, verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res
        .status(401)
        .json({ message: "Incorrect email address, username, or password." });
      return;
    }

    // Generate token if password matches
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Set token in cookie and respond with user info
    res.cookie("authToken", token, { httpOnly: true }).json({
      message: "Login successful",
      user: {
        id: user.id,
        emailAddress: user.emailAddress,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};

export async function updatePassword(req, res) {
  try {
    const userId = req.userId;
    const prevPassword = req.body.prevPassword;
    const newPassword = req.body.newPassword;

    const user = await client.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await bcrypt.compare(prevPassword, user.password);

    const theyMatch = await bcrypt.compare(prevPassword, user.password);

    if (theyMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      const updated = await client.users.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });
      res.status(200).json({ message: "password updated succesfully" });
    }
    res.status(400).json({ message: "wrong previous password" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
}
