import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"

export const isLoggedInUser = async (req, res, next) => {
  try {
    // Check if token is provided
    const { token } = req.token.cookie;
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.body.userId = decodedToken.id; // Attach userId to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default isLoggedInUser;
