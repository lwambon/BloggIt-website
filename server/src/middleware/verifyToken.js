import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const { authToken } = req.cookies;

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }
    req.userId = decoded.id;
    next();
  });
}

export default verifyToken;
