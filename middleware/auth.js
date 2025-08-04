import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

    req.userId = decoded.userId
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(401).json({ message: "Invalid token" })
  }
}

export default auth
