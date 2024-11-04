import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function validateUserInfo(req, res, next) {
  const { firstName, lastName, userName, emailAddress, password } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "First name is required" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ message: "Last name is required" });
    return;
  }
  if (!userName) {
    res.status(400).json({ message: "User name is required" });
    return;
  }
  if (!emailAddress) {
    res.status(400).json({ message: "Email address is required" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  // Check if email address is already in use
  const userWithEmail = await client.users.findFirst({
    where: { emailAddress: emailAddress },
  });
  if (userWithEmail) {
    res.status(400).json({ message: "Email address already taken" });
    return;
  }

  // Check if user name is already in use
  const userWithUserName = await client.users.findFirst({
    where: { userName: userName },
  });
  if (userWithUserName) {
    res.status(400).json({ message: "User name already exists" });
    return;
  }

  next();
}

export default validateUserInfo;
