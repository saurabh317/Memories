import { Post } from "../models/post.model.js"
import mongoose, { Mongoose } from "mongoose"

export default class PostsController {

  static getPosts = async(req, res) => {
    try {
      const allPosts = await Post.find()
      res.status(200).json(allPosts)
    } catch {
      res.status(501).json({
        status: 501,
        error: "something went wrong while fetching data..."
      })
    }
  }

  static createPost = async(req, res) => {
    const post = req.body
    const newPost = new Post(post)

    try {
      await newPost.save()
      res.status(200).json({
        status: 200,
        data: newPost,
        msg: "post created succesfully"
      })
    } catch (err) {
      res.status(501).json({
        status: 501,
        err: "something went wrong while posting.."
      })
    }
  }

  static updatePost = async(req, res) => {
    const { postId, details } = req.body
    try {
      await Post.findOneAndUpdate({_id: postId}, details)
      res.status(200).json({
        status: 200,
        msg: "post updated successfully"
      })
    } catch {
      res.status(501).json({
        status: 501,
        msg: "something went wrong while updating post"
      })
    }
  }

  static updateLikeCount = async(req, res) => {
    const { postId } = req.body
    try {
      const post = await Post.findOne({_id: postId})
      await Post.updateOne({_id: postId}, {likeCount: post.likeCount+1})
      res.status(200).json({
        status: 200,
        msg: "post updated successfully"
      })
    } catch {
      res.status(501).json({
        status: 501,
        msg: "something went wrong while updating like count"
      })
    }
  }

  static deletePost = async(req, res) => {
    const { postId } = req.body
    try {
      await Post.deleteOne({_id: new mongoose.Types.ObjectId(postId)})
      res.status(200).json({
        status: 200,
        msg: "post deleted successfully"
      })
    } catch {
      res.status(501).json({
        status: 501,
        error: "something went wrong while deleting post..."
      })
    }
  }

}