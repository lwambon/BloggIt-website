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

export async function fetchingSingleBlog(req, res) {
  try {
    const { id } = req.params;

    const blog = await client.blogs.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
}
