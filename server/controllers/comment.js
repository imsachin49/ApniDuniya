const express = require("express");
const router = express.Router();
const Comment=require("../models/Comment.js");
const User=require("../models/User.js");
const Post=require("../models/Post.js");

const addComment = async (req, res) => {
    try {
      const {user}=req;
      console.log(user);
      const { id } = req.params; 
      const post = await Post.findById(id);
      console.log(post)

      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      const comment = new Comment({
        comment: req.body.comment,
        user: user.id,
        post: post._id,
      });
      await comment.save();
      
      post.comments.push(comment._id);
      await post.save();
      res.status(200).json(post);

    } catch (error) {
      console.log(error);
      res.status(500).json('Internal server error');
    }
};


const getComments = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate('comments');
      if (!post) {
        return res.status(404).json('Post not found');
      }
      console.log(post.comments)
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
}

const updateComment = async (req, res) => {
    try{
        const updatedComment=await Comment.findByIdAndUpdate(req.params.commentId, {$set:req.body}, {new:true});
        res.status(200).json(updatedComment);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

const deleteComment = async (req, res) => {    
    try{
        const deletedComment=await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json(deletedComment);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = { addComment, getComments, updateComment, deleteComment};
