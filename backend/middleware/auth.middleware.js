import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      if (user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Authentication required" });
  }
};
