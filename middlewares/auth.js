import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utlis/config.js";
import User from "../models/User.js";

export const auth = {
  checkAuth: async (req, res, next) => {
    try {
      // console.log("🔐 Incoming Headers:", req.headers);

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      // ✅ Correct token extraction
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ msg: "Invalid token format" });
      }

      // console.log("🔑 JWT Token:", token);

      // Verify token
      const decoded = jwt.verify(token, SECRET_KEY);
      // console.log("✅ Decoded Token:", decoded);

      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }

      // console.log("🙋 Authenticated User:", user.name);

      // Attach user ID to request
      req.userId = decoded.id;

      next();
    } catch (error) {
      console.error("❌ Authentication Error:", error.message);
      res.status(401).json({ msg: "Invalid or expired token" });
    }
  },

  allowRoles: (roles) => {
    return async (req, res, next) => {
      try {
        const userId = req.userId;
        // console.log(userId)
        if (!userId) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        // console.log(`🛡 Role Check: Required: [${roles.join(", ")}], User: ${user.role}`);

        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }

        next();
      } catch (err) {
        console.error("❌ Role Middleware Error:", err.message);
        res.status(500).json({ message: "Server error" });
      }
    };
  },
};
