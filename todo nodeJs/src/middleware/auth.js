const jwt = require("jsonwebtoken")


const SECRET_KEY = "coderains@srt";
const WHITELIST = [
    '/signin.ss',
    '/signup.ss'
]

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            // token = token.split(" ")[0]; 
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = user.id;
            next();
        } else {
            if (WHITELIST.indexOf(req.url) !== -1) {
                next();
            } else {
                res.status(401).send("Unauthorized request");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;