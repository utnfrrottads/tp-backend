require("dotenv").config({ path: "../../.env" });
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = new User({
            username,
            password: await User.encryptPassword(password)
        });

        let savedUser = await user.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        })

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.signin = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(400).json({ msg: "User not found" });

        let matchPassword = await User.comparePassword(req.body.password, user.password);

        if (!matchPassword) return res.status(401).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.update = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: "El usuario no existe" });
        }

        const { username, password } = req.body;

        user.username = username;
        user.password = password;

        user = await User.findByIdAndUpdate({ _id: req.params.id }, user, { new: true });
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.findOne = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: "El usuario no existe" });

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.delete = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: "El usuario no existe" });


        await User.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Usuario eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}