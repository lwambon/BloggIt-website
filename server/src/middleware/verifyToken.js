import jwt from "jsonwebtoken";
function verifyToken(res, req, next) {
  const { authToken } = req.cookies;
  jwtverify(authToken, process.env.JWT_SECRET, (error, decoded) => {
    if (err) {
      res.status(401).json({ message: "unauthorized person" });
    }
  });
  next();
}

export default verifyToken;
