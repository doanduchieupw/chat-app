const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const saltOrRounds = 10;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({
                msg: 'This username is already taken. Please choose another name',
                status: false,
            });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({
                msg: 'This email address is already being used',
                status: false,
            });
        }
        const passwordHash = await bcrypt.hash(password, saltOrRounds);
        const user = await User.create({
            username,
            email,
            password: passwordHash,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (err) {
        next(err);
    }
};
module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                msg: 'Username or password are wrong!',
                status: false,
            });
        }
        const isPasswordInvalid = await bcrypt.compare(password, user.password);
        if (!isPasswordInvalid) {
            return res.json({
                msg: 'Username or password are wrong!',
                status: false,
            });
        }
        delete user.password;
        return res.json({ status: true, user });
    } catch (err) {
        next(err);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.params.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (err) {
        next(err);
    }
};
