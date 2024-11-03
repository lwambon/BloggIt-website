export function createBlog(req, res) {
  try {
    res.status(200).json({ message: "creating a blog" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong try again later" });
  }
}
