const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("🔓 Decoded from token:", decoded);

    req.user = decoded; 
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("🛂 Role verification - Decoded token:", decoded);

      if (decoded.role !== requiredRole) {
        return res.status(403).json({
          message: `Access denied. You are not authorized as a ${requiredRole}.`,
        });
      }

      req.user = decoded; 
      next();
    } catch (err) {
      console.error("❌ Token authorization failed:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = {
  verifyToken,
  authorizeRole,
};
