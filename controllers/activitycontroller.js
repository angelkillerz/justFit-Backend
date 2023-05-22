const { Activity } = require("../models/Activitity");

// POST (Create) - Create a new activity.
//       '/api/activity'
exports.createActivity = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log('userId', userId);

    const { activityType, title, dateTime, duration, energyBurn, distance, description } = req.body;

    console.log(req.body);

    try {
        console.log("Createing new object.");
        const newActivity = new Activity({
            activityType: activityType,
            title: title,
            dateTime: dateTime,
            duration: duration,
            energyBurn: energyBurn,
            distance: distance,
            description: description,
            userId: userId,
        });
        console.log("Createing success.");
        const savedActivity = await newActivity.save();
        console.log('savedActivity: ', savedActivity)
        return res.status(201).json(savedActivity);
    } catch (error) {
        // return res.status(404).json({ message: error.message });
        console.log(error);
    }
}

// GET - Get all activity by id
// "/api/activity"
exports.getActivity = async (req, res) => {
    const userId = req.headers['x-user-id'];
    console.log('userId', userId);

    const data = await Activity.find({ userId });
    console.log("fetch data by id : ", data);
    return res.status(200).json({
        data
    });
}

// PUT (EDIT/UPDATE) - Activity by id
// "/api/activity/:id"
exports.updateActivity = async (req, res) => {
    const userId = req.headers['x-user-id'];
    const activityId = req.params.id;

    console.log('userId', userId);
    console.log("activityId", activityId);

    const { activityType, title, dateTime, duration, energyBurn, distance, description } = req.body;
    try {
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: activityId, userId: userId },
            {
                activityType: activityType,
                title: title,
                dateTime: dateTime,
                duration: duration,
                energyBurn: energyBurn,
                distance: distance,
                description: description,
            },
            { new: true }
        );

        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        console.log('updatedActivity: ', updatedActivity);
        return res.status(200).json(updatedActivity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE - Activity by id
// '/api/activity/:id'
exports.deleteActivity = async (req, res) => {
    const userId = req.headers['x-user-id'];
    const activityId = req.params.id;

    console.log('userId delete : ', userId);
    console.log("user delete cardId : ", activityId);
    const { activityType, title, dateTime, duration, energyBurn, distance, description } = req.body;
    try {
        // const deleteActivity = await Activity.findOneAndDelete(
        //     { _id: activityId, userId: userId },
        //     {
        //         activityType: activityType,
        //         title: title,
        //         dateTime: dateTime,
        //         duration: duration,
        //         energyBurn: energyBurn,
        //         distance: distance,
        //         description: description,
        //     },
        //     { new: true }
        // );

        const deleteActivity = await Activity.findOneAndDelete({ _id: activityId }, { new: true });
        console.log("Delete activity success.");

        if (!deleteActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        console.log('deleteActivity: ', deleteActivity);
        return res.status(200).json(deleteActivity);
    } catch (error) {
        // return res.status(500).json({ message: error.message });
        console.log(error);
    }
}