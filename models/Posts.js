import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
  {
    content: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
      image: {
        type: String,
        default: "",
      },
      imagePublicId: {
        type: String,
        default: "",
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },    
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Post", PostSchema)

