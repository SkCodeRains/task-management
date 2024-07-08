require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./src/routes/userRoutes');
const { default: mongoose } = require('mongoose');
const auth = require('./src/middleware/auth');
const taskRouter = require('./src/routes/taskRoutes');
const fileUpload = require('express-fileupload');

app.get("", (req, res) => {
    res.send("Hello Dear How Are YOu ")
})

app.use(express.json());
// Middleware to handle multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


const whitelist = ['http://localhost:4200', "http://localhost:3000", 'http://192.168.180.12:4200', 'http://192.168.54.17:4200', 'https://skcoderains.github.io']; // Array of allowed origins
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));
// Enable CORS for all routes only during development

app.use(auth);

app.use("/", userRouter);
app.use("/", taskRouter);


app.get("/test.ss", (req, res) => {
    res.send("Hello darling")
})




mongoose.connect(process.env.MONGO_URI).then((connection) => {
    app.listen(process.env.PORT);
});