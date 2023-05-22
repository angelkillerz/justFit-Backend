const { Activity } = require("../models/Activitity");
const { Goal } = require("../models/Goal")

// need (userId, id = _id)
exports.getTotalsUserActivityStats = async (req, res) => {
    const userId = req.headers['x-user-id'];

    try {
        const activityResult = await Activity.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    totalDuration: { $sum: '$duration' },
                    totalDistance: { $sum: '$distance' },
                    totalEnergyBurn: { $sum: '$energyBurn' },
                    countActivities: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalDuration: 1,
                    totalDistance: 1,
                    totalEnergyBurn: 1,
                    countActivities: 1
                }
            }
        ]);

        const goalResult = await Goal.aggregate([
            { $match: { userId: userId, status: 'done' } },
            {
                $group: {
                    _id: null,
                    totalEnergyBurn: { $sum: '$energyBurn' },
                    countGoalsDone: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalEnergyBurn: 1,
                    countGoalsDone: 1
                }
            }
        ]);

        const activityData = activityResult.length > 0 ? activityResult[0] : {};
        const goalData = goalResult.length > 0 ? goalResult[0] : {};

        const mergedResult = {
            totalDuration: activityData.totalDuration || 0,
            totalDistance: activityData.totalDistance || 0,
            totalEnergyBurn: (activityData.totalEnergyBurn || 0) + (goalData.totalEnergyBurn || 0),
            countActivities: activityData.countActivities || 0,
            countGoalsDone: goalData.countGoalsDone || 0
        };

        console.log('Merged Result:', mergedResult);
        res.send(mergedResult)
    } catch (error) {
        console.error('Error:', error);
    }
}
