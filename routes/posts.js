import express from "express"
import multer from "multer"
import path from "path"
import Post from "../models/Posts.js"
import auth from "../middleware/auth.js"
import { uploadPost, cloudinary } from "../config/cloudinary.js"

const router = express.Router()

// Get all posts
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find().populate("author", "name email profilePicture").sort({ createdAt: -1 }).limit(50)
  
      res.json(posts)
    } catch (error) {
      console.error("Fetch posts error:", error)
      res.status(500).json({ message: "Internal server error" })
    }
})

// Create post with optional image
router.post("/", auth, uploadPost.single("image"), async (req, res) => {
    try {
      const { content } = req.body
  
      if (!content && !req.file) {
        return res.status(400).json({ message: "Content or image is required" })
      }
  
      const postData = {
        content: content || "",
        author: req.userId,
      }
  
      if (req.file) {
        postData.image = req.file.path // Cloudinary URL
        postData.imagePublicId = req.file.filename // Cloudinary public ID for deletion
      }
  
      const post = new Post(postData)
      await post.save()
      await post.populate("author", "name email profilePicture")
  
      res.status(201).json(post)
    } catch (error) {
      console.error("Create post error:", error)
  
      // Clean up uploaded image if post creation fails
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
  
  // Delete post (with image cleanup)
router.delete("/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" })
      }
  
      // Check if user owns the post
      if (post.author.toString() !== req.userId) {
        return res.status(403).json({ message: "Not authorized to delete this post" })
      }
  
      // Delete image from Cloudinary if exists
      if (post.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(post.imagePublicId)
        } catch (cloudinaryError) {
          console.error("Failed to delete image from Cloudinary:", cloudinaryError)
        }
      }
  
      await Post.findByIdAndDelete(req.params.id)
      res.json({ message: "Post deleted successfully" })
    } catch (error) {
      console.error("Delete post error:", error)
      res.status(500).json({ message: "Internal server error" })
    }
})
  
  // Get posts by user
router.get("/user/:id", async (req, res) => {
    try {
      const userId = req.params.id
  
      const posts = await Post.find({ author: userId }).sort({ createdAt: -1 }).select("content image createdAt")
  
      res.json(posts)
    } catch (error) {
      console.error("Fetch user posts error:", error)
      res.status(500).json({ message: "Internal server error" })
    }
})

export default router
