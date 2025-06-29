const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res) {
    try {

        const { username, firstName, email, password, confirmPassword } = req.body;

        if (!username || !firstName || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(409).json({ error: "Username or Email is Already in use." });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({ username, firstName, email, password: hashedPass });

        await newUser.save();
        return res.status(201).json({ message: "Registration successful!" });

    } catch (err) {
        console.error("[REGISTRATION ERROR]: ", err);
        res.status(500).json({ error: "Internal Server Error: ", err });
    }
}

async function loginUser(req, res) {

    try {
        const { usernameOremail, password } = req.body;

        if (!usernameOremail.trim() || !password.trim()) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // console.log("usernameOremail: ",usernameOremail);
        // console.log("password: ",password);


        const user = await User.findOne({
            $or: [{ email: usernameOremail }, { username: usernameOremail }]
        });

        if (!user) {
            return res.status(401).json({ error: "[Username]: Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "[Password]: Invalid Credentials" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: "Login Succesfull",
            token,
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                email: user.email
            }
        });
    } catch (err) {
        console.log("Login Error: ", err);
        res.json(500).json({ error: "Server Error." });
    }
};


module.exports = {
    registerUser,
    loginUser
};