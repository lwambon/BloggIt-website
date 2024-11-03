import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export const loginUsers = async (req, res) => {
  try {
    const emailAddress = req.body.emailAddress;
    const userName = req.body.userName;
    const password = req.body.password;
    //console.log(`email is${emailAddress} username is ${userName} password is ${password} ` );
    //query database against the email and username
    const user = await client.users.findFirst({
      where: {
        OR: [{ userName: userName }, { EmailAddress: emailAddress }],
      },
    });

    // check if user does not exist
    if (!user) {
      res
        .status(402)
        .json({ message: "wrong emailAddress, userName or password" });
      return;
    }

    // if user exists
    const validPassword = await bcrypt.compare(password, user.password);

    // not matching password
    if (!validPassword) {
      res
        .status(401)
        .json({ message: "wrong emailAddress, username or password" });
      return;
    }

    // generate token if match
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};
