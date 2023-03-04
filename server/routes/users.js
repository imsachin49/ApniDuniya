// import express from "express";

// import {
//   getUser,
//   getUserFriends,
//   addRemoveFriend,
//   findUser,
// } from "../controllers/users.js";

// import { verifyToken } from "../middleware/auth.js";
const express = require("express");
const {getUser,getUserFriends,addRemoveFriend,findUser}=require("../controllers/users.js");
const {verifyToken}=require("../middleware/auth.js");

const router = express.Router();


/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

router.get('/find/me',findUser);

// export default router;
module.exports = router;