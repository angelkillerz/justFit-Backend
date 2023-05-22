const { User } = require("../models/User");

exports.register = async (req, res) => {
    const { username, firstName, profileImage, userId } = req.body;
    try {
        console.log(username, firstName, profileImage);

        const isExist = await User.findOne({ userId });
        if (isExist) {
            return res.sendStatus(409)
        }

        const newUser = new User({
            userId,
            username,
            firstName,
            profileImage,
        });

        const newUserSave = await newUser.save();
        console.log("new user ", newUserSave);

        res.send(newUserSave);
    } catch (error) {
        // return res.status(404).json({ message: error.message });
        console.log(error);
        res.sendStatus(409).json({ message: error.message });
    }
}