const express = require('express');
const userRouter = express.Router();
const { signIn, signUp, updateProfile } = require('../controller/userController');
const upload = require('../services/multer');



userRouter.post("/signin.ss", signIn);
userRouter.post("/signup.ss", signUp);
userRouter.post("/updateProfile.ss", updateProfile);

// , upload.single("picture")

module.exports = userRouter;