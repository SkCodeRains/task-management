const express = require('express');
const bcypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
var path = require('path');
var fs = require('fs');


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
            user: user.toObject()
        });
    } catch {
        res.status(401).send("Unauthorized request");
    }
}



const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const isExistsUser = await userModel.findOne({ email: email });
    if (isExistsUser) {
        res.status(400).send({
            status: false,
            message: "User Already Exists"
        });
        return;
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
        user: user.toObject()
    });
}

const updateProfile = async (req, res) => {
    const response = {
        success: false,
    };

    // const filePath = path.join(__dirname, '../../public/images/uploads', req.file.filename);
    // fs.readFile(filePath, async (err, data) => {
    //     if (err) {
    //         return res.status(500).send({ message: 'Error reading file from disk', error: err });
    //     }
    // });

    let imageFile = {};
    if (await req?.files) {
        if (await req.files?.picture)
            imageFile = {
                profilePicture: {
                    data: await req.files?.picture.data,
                    contentType: await req.files?.picture.mimetype
                }
            }
    }

    try {
        const requestBody = {
            ...req.body, ...imageFile
        }
        const previouseUser = await userModel.findOneAndUpdate({ _id: req.userId }, requestBody);
        if (previouseUser) {
            response.success = true
            response.user = await getUser(req.userId);
            previouseUser.toObject()
            res.send(response);
        } else {
            res.status(401).send("Unauthorized request");
        }

    } catch (error) {
        console.error(error);
        response.message = 'Error updating profile.';
        res.status(500).json(response);
    }
}
const getUser = async (id) => {
    const user = await userModel.findOne({ _id: id });
    return user.toObject();
}

module.exports = { signIn, signUp, updateProfile }