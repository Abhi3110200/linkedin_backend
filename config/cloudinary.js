// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

import dotenv from 'dotenv'

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure multer storage using Cloudinary
const postStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "linkedin-community/posts",
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
      transformation: [{ width: 800, height: 600, crop: "limit" }, { quality: "auto" }, { fetch_format: "auto" }],
    },
  })
  
  // Configure Cloudinary storage for profile pictures
  const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "linkedin-community/profiles",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    },
  })

const uploadPost = multer({ storage : postStorage })
const uploadProfile = multer({ storage: profileStorage })

export { uploadPost, uploadProfile, cloudinary }
