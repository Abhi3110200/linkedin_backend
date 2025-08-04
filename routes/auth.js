import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, bio } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" })
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      bio: bio || "",
    })

    await user.save()

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Get current user
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Auth verification error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export default router
