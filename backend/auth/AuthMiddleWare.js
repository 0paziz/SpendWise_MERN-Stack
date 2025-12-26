const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET 

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = jwt.verify(token, JWT_SECRET);
    // attach minimal user info for downstream handlers
    req.user = { id: payload.id, email: payload.email };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;