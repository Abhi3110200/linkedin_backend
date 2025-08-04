import express from "express"
import multer from "multer"
import path from "path"
import User from "../models/User.js"
import auth from "../middleware/auth.js"
import { uploadProfile, cloudinary } from "../config/cloudinary.js"


const router = express.Router()

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Fetch user error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Upload profile picture
router.post("/profile-picture", auth, uploadProfile.single("profilePicture"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" })
      }
  
      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
  
      // Delete old profile picture from Cloudinary if exists
      if (user.profilePicturePublicId) {
        try {
          await cloudinary.uploader.destroy(user.profilePicturePublicId)
        } catch (cloudinaryError) {
          console.error("Failed to delete old profile picture:", cloudinaryError)
        }
      }
  
      // Update user's profile picture
      user.profilePicture = req.file.path // Cloudinary URL
      user.profilePicturePublicId = req.file.filename // Cloudinary public ID
      await user.save()
  
      // Return updated user without password
      const updatedUser = await User.findById(req.userId).select("-password")
      res.json(updatedUser)
    } catch (error) {
      console.error("Profile picture upload error:", error)
  
      // Clean up uploaded image if user update fails
      if (req.file && req.file.filename) {
        try {
          await cloudinary.uploader.destroy(req.file.filename)
        } catch (cleanupError) {
          console.error("Failed to cleanup uploaded image:", cleanupError)
        }
      }
  
      res.status(500).json({ message: "Internal server error" })
    }
  })
  
  // Delete profile picture
  router.delete("/profile-picture", auth, async (req, res) => {
    try {
      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
  
      // Delete profile picture from Cloudinary if exists
      if (user.profilePicturePublicId) {
        try {
          await cloudinary.uploader.destroy(user.profilePicturePublicId)
        } catch (cloudinaryError) {
          console.error("Failed to delete profile picture:", cloudinaryError)
        }
      }
  
      // Remove profile picture from user
      user.profilePicture = ""
      user.profilePicturePublicId = ""
      await user.save()
  
      const updatedUser = await User.findById(req.userId).select("-password")
      res.json(updatedUser)
    } catch (error) {
      console.error("Delete profile picture error:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  })
  

export default router
