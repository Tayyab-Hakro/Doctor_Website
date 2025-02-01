import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const isLoggedInUser = (req, res, next) => {
  try {
    // Ensure the SECRET_TOKEN_KEY exists
    if (!process.env.SECRET_TOKEN_KEY) {
      console.error("SECRET_TOKEN_KEY is missing in environment variables.");
      return res.status(500).json({ success: false, message: "Server configuration error." });
    }

    // Retrieve the token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);

    // Attach the decoded user ID to the request object
    req.user = { id: decoded.userID };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    // Handle specific token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
    }

    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default isLoggedInUser;
