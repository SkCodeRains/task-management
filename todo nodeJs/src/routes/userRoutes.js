const express = require('express');
const userRouter = express.Router();
const { signIn, signUp } = require('../controller/userController');



userRouter.post("/signin.ss", signIn);
userRouter.post("/signup.ss", signUp);

module.exports = userRouter;