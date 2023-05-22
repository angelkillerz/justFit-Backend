const { Goal } = require("../models/Goal");

// POST (Create) - Create a new goal.
exports.createGoal = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log('userId', userId);
    const { activityType, deadline, energyBurn, duration, distance, status } = req.body;
    try {
        const newGoal = new Goal({
            userId: userId,
            activityType: activityType,
            deadline: deadline,
            energyBurn: energyBurn,
            duration: duration,
            distance: distance,
            status: status,
        });
        const savedGoal = await newGoal.save();
        console.log('savedGoal: ', savedGoal)
        return res.status(201).json(savedGoal);
    } catch (error) {
        // return res.status(404).json({ message: error.message });
        console.log(error);
    }
};

exports.getGoal = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        console.log('userId', userId);
        // const data = await Goal.find({ userId });
        const data = await Goal.find({ userId }).sort({ status: -1 });
        console.log("get goal : ", data);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

exports.updateStatusGoal = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { id: goalId } = req.params;
        const { status } = req.body;
        console.log(status, goalId);
        const goalUpdated = await Goal.findOneAndUpdate({ _id: goalId, userId }, { $set: { status: status } }, { new: true })
        console.log("Update status success.", goalUpdated);
        res.send(goalUpdated);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

exports.getGoalsByStatus = async (req, res) => {
    const userId = req.headers['x-user-id'];
    const { status } = req.params;
    try {
        const goalsResult = await Goal.find({ userId, status });
        res.json(goalsResult);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}