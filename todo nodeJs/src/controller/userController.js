const express = require('express');
const bcypt = require("bcrypt")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


const SECRET_KEY = "coderains@srt";

const signIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User Not Exists"
            })
        }

        const validPassword = await bcypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send({
                status: false,
                message: "Authentication Failed"
            });
        }

        const token = jwt.sign({ username: user.username, email: user.email, id: user._id }, SECRET_KEY);

        res.status(201).send({
            token: token,
            user: user
        });
    } catch {

    }
}



const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const isExistsUser = await userModel.findOne({ email: email });
    if (isExistsUser) {
        res.status(400).send({
            status: false,
            message: "User Already Exists"
        })
    }

    const hashedPass = await bcypt.hash(password, 12);
    const user = await userModel.create({
        username: username,
        password: hashedPass,
        email: email
    });

    const token = jwt.sign({ username: username, email: email, id: user._id }, SECRET_KEY);

    res.status(201).send({
        token: token,
        username: username,
        email: email,
        user: user
    });
}

const getUserData = (req, res) => {
    res.send({

    })
}

module.exports = { signIn, signUp }