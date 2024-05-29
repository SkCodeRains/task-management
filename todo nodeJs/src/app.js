const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const { default: mongoose } = require('mongoose');
const auth = require('./middleware/auth');
const taskRouter = require('./routes/taskRoutes');


app.use(express.json());

const whitelist = ['http://localhost:4200', "http://localhost:3000", "http://192.168.253.18:4200"]; // Array of allowed origins
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




mongoose.connect("mongodb://localhost:27017/tasksDb").then(() => {
    app.listen(3000);
});