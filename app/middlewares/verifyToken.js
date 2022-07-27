require("dotenv").config({ path: "../../.env" });
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
    try {
        //const token = req.headers.authorization; // esto desde el front
        //const token = req.headers["x-access-token"]; // esto desde postman
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.headers["x-access-token"];
       
        if (!token) {
            return res.status(403).json({ msg: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        let user = await User.findById(decoded.id, { password: 0 });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized");
    }
}