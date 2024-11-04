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
