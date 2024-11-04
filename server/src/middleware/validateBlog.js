function validateBlog(req, res, next) {
  const { BlogTitle, synopsis, body, visibility } = req.body;
  if (!BlogTitle) {
    return res.status(400).json({ message: "BlogTitle is required" });
  }
  if (!synopsis) {
    return res.status(400).json({ message: "synopsis is required" });
  }
  if (!body) {
    return res.status(400).json({ message: "body is required" });
  }
  if (!visibility) {
    return res.status(400).json({ message: "visibility is required" });
  }
  if (visibility !== "public" && !visibility !== "private")
    return res
      .status(400)
      .json({ message: "visibility can either be public or private" });

  next();
}
export default validateBlog;
