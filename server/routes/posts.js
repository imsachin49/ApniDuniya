// import express from "express";
// import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
// import { verifyToken } from "../middleware/auth.js";
const express = require("express");
const { getFeedPosts, getUserPosts, likePost } = require("../controllers/posts.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/give", getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

// export default router;
module.exports = router;
