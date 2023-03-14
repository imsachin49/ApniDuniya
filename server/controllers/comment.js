const express = require("express");
const router = express.Router();
const Comment=require("../models/Comment.js");
const User=require("../models/User.js");
const Post=require("../models/Post.js");


const addComment = async (req, res) => {
    try {
      const { user } = req; 
      const { id } = req.params; 
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      const { content } = req.body;
      const comment = new Comment({
        content,
        author: user._id,
        post: post._id,
      });
      await comment.save();
  
      post.comments.push(comment._id);
      await post.save();
  
      res.status(200).send(comment);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
};


const getComments = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate('comments');
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.status(200).send(post.comments);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
}

const updateComment = async (req, res) => {
    try{
        const updatedComment=await Comment.findByIdAndUpdate(req.params.commentId, {$set:req.body}, {new:true});
        res.status(200).send(updatedComment);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}


const deleteComment = async (req, res) => {    
    try{
        const deletedComment=await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).send(deletedComment);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = { addComment, getComments, updateComment, deleteComment};
