import mongoose, { Schema } from "mongoose"

const postSchema = new Schema(
  {
    title: {
      type: String
    },
    message: String,
    creator: String,
    tags: [String],
    image: String,
    likeCount: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)


export const Post = mongoose.model("Post", postSchema)