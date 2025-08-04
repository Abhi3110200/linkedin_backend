import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },
    profilePicture: {
        type: String,
        default: "",
      },
      profilePicturePublicId: {
        type: String,
        default: "",
      },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("User", UserSchema)
