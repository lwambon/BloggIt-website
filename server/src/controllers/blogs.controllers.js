import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function createBlog(req, res) {
  try {
    const { BlogTitle, synopsis, body, visibility } = req.body;
    const userId = req.userId;

    const newBlog = await client.blogs.create({
      data: {
        BlogTitle,
        synopsis,
        body,
        visibility,
        owner: userId,
      },
    });
    res.status(201).json(newBlog);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
}
