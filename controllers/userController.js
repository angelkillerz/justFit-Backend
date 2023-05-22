const { User } = require("../models/User");

// need (userId)
exports.createUser = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log('userId', userId);
    const { username, firstName, profileImage } = req.body;
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
};

// need (userId)
exports.getUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        console.log('userId', userId);
        console.log(userId)
        const user = await User.findOne({ userId });

        console.log("get current user ", user);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

// need (userId, id of _id)
exports.updateUser = async (req, res) => {
    try {
        // const userId = req.headers['x-user-id'];
        const { id: userId } = req.params;

        const { firstName, lastName, dateOfBirth, gender, height, weight, profileImage } = req.body;

        // to make sure user and id are same person. even it's not need.
        const userUpdate = await User.findOneAndUpdate({ userId }, {
            $set: {
                firstName, lastName, dateOfBirth, gender, height, weight, profileImage
            }
        }, { new: true })

        console.log("Updated user.");
        res.send(userUpdate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

// need (userId)
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const user = User.findOneAndDelete({ userId })
        res.send("Delete user success.");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}