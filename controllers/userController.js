const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username) {
            return res.status(400).json({error: "Please provide a username!"});
        };

        if (!email) {
            return res.status(400).json({error: "Please provide a email!"});
        };

        if (!password) {
            return res.status(400).json({error: "Please provide a password!"});
        };

        if (password.length < 8 || password.length >= 16) {
            return res.status(400).json({error: "Password must be in between 8 and 16 characters!"});
        };

        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(400).json({error: "User Does Not Exists!"});
        };

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({error: "Invalid Credentials!"});
        };

        return res.status(200).json({message: "Login Successfull..."});

    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

module.exports = {login};