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

export async function fetchingAllBlogs(req, res) {
  try {
    const blog = await client.blogs.findMany({
      where: { visibility: "public" },
      include: { user: true },
    });
    res.status(200).json(blog);
  } catch (e) {
    console.error("Error fetching blogs:", error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
}

export async function getUsersBlogs(req, res) {
  try {
    const userId = req.userId;
    const blog = await client.blogs.findMany({
      where: { owner: userId },
    });
    res.send(blog);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Something went wrong, please try again later" });
  }
}

export async function deleteBlog(req, res) {
  try {
    const { blogId } = req.params;
    const userId = req.userId;
    await client.blogs.delete({
      where: {
        id: blogId,
        owner: userId,
      },
    });
    res.status(200).json({ message: "note successfully deleted" });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
}

export async function updateBlog(req, res) {
  try {
    const { blogId } = req.params;
    const { BlogTitle, synopsis, body, visibility } = req.body;
    const userId = req.userId;
    const blog = await client.blogs.update({
      where: {
        id: blogId,
        owner: userId,
      },
      data: { BlogTitle, synopsis, body, visibility },
    });
    res.status(200).json(blog);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
}
