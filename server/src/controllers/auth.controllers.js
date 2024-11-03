import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();
export const loginUsers = async (req, res) => {
  try {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    console.log(`Email: ${emailAddress}, Password: ${password}`);

    //query database against email
    const user = await client.users.findFirst({
      where: { emailAddress: emailAddress },
    });

    //if user does not exist,
    if (!user) {
      res.status(401).json({ message: "Wrong email address or password" });
      return;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      res.status(401).json({ message: "Wrong email address or password" });
      return;
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET);

    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};
