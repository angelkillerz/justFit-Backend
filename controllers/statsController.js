const moment = require("moment");
const { Activity } = require("../models/Activitity");
const { Goal } = require("../models/Goal")

exports.getTotalsUserActivityStatsAll = async (req, res) => {
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
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalEnergyBurn: { $sum: '$energyBurn' },
          countGoals: { $sum: 1 },
          countGoalsDone: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
          countGoalsCancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancel'] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          totalEnergyBurn: 1,
          countGoals: 1,
          countGoalsDone: 1,
          countGoalsCancelled: 1,
        },
      },
    ]);

    const weeklyActivityTypeResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
        }
      },
      {
        $group: {
          _id: { activityType: '$activityType' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          activityType: '$_id.activityType',
          count: 1
        }
      }
    ]);

    const activityData = activityResult.length > 0 ? activityResult[0] : {};
    const goalData = goalResult.length > 0 ? goalResult[0] : {};

    const mergedResult = {
      countActivities: activityData.countActivities || 0,
      totalDuration: activityData.totalDuration || 0,
      totalDistance: activityData.totalDistance || 0,
      totalEnergyBurn: (activityData.totalEnergyBurn || 0) + (goalData.totalEnergyBurn || 0),
      countGoals: goalData.countGoals || 0,
      countGoalsDone: goalData.countGoalsDone || 0,
      countGoalsCancelled: goalData.countGoalsCancelled || 0,
      weeklyActivityTypeStats: weeklyActivityTypeResult,
    };

    console.log('Merged Result:', mergedResult);
    res.send(mergedResult);
  } catch (error) {
    console.error('Error:', error);
  }
};

exports.getTotalsUserActivityStatsByMonth = async (req, res) => {
  const userId = req.headers['x-user-id'];

  try {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    console.log("Month start : ", startOfMonth);
    console.log("Month end : ", endOfMonth);

    const activityResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          dateTime: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() }
        }
      },
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
      {
        $match: {
          userId: userId,
          deadline: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() }
        }
      },
      {
        $group: {
          _id: null,
          totalEnergyBurn: { $sum: '$energyBurn' },
          countGoals: { $sum: 1 },
          countGoalsDone: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
          countGoalsCancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancel'] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          totalEnergyBurn: 1,
          countGoals: 1,
          countGoalsDone: 1,
          countGoalsCancelled: 1,
        },
      },
    ]);

    const monthlyActivityTypeResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          dateTime: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() }
        }
      },
      {
        $group: {
          _id: { activityType: '$activityType' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          activityType: '$_id.activityType',
          count: 1
        }
      }
    ]);

    const activityData = activityResult.length > 0 ? activityResult[0] : {};
    const goalData = goalResult.length > 0 ? goalResult[0] : {};

    const mergedResult = {
      countActivities: activityData.countActivities || 0,
      totalDuration: activityData.totalDuration || 0,
      totalDistance: activityData.totalDistance || 0,
      totalEnergyBurn: (activityData.totalEnergyBurn || 0) + (goalData.totalEnergyBurn || 0),
      countGoals: goalData.countGoals || 0,
      countGoalsDone: goalData.countGoalsDone || 0,
      countGoalsCancelled: goalData.countGoalsCancelled || 0,
      monthlyActivityTypeStats: monthlyActivityTypeResult,
    };

    console.log('Merged Result:', mergedResult);
    res.send(mergedResult);
  } catch (error) {
    console.error('Error:', error);
  }
};

exports.getTotalsUserActivityStatsByDay = async (req, res) => {
  const userId = req.headers['x-user-id'];

  try {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    const activityResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          dateTime: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
        }
      },
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
      {
        $match: {
          userId: userId,
          deadline: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
        }
      },
      {
        $group: {
          _id: null,
          totalEnergyBurn: { $sum: '$energyBurn' },
          countGoals: { $sum: 1 },
          countGoalsDone: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
          countGoalsCancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancel'] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          totalEnergyBurn: 1,
          countGoals: 1,
          countGoalsDone: 1,
          countGoalsCancelled: 1,
        },
      },
    ]);

    const dailyActivityTypeResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          dateTime: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
        }
      },
      {
        $group: {
          _id: { activityType: '$activityType' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          activityType: '$_id.activityType',
          count: 1
        }
      }
    ]);

    const activityData = activityResult.length > 0 ? activityResult[0] : {};
    const goalData = goalResult.length > 0 ? goalResult[0] : {};

    const mergedResult = {
      countActivities: activityData.countActivities || 0,
      totalDuration: activityData.totalDuration || 0,
      totalDistance: activityData.totalDistance || 0,
      totalEnergyBurn: (activityData.totalEnergyBurn || 0) + (goalData.totalEnergyBurn || 0),
      countGoals: goalData.countGoals || 0,
      countGoalsDone: goalData.countGoalsDone || 0,
      countGoalsCancelled: goalData.countGoalsCancelled || 0,
      dailyActivityTypeStats: dailyActivityTypeResult,
    };

    console.log('Merged Result:', mergedResult);
    res.send(mergedResult);
  } catch (error) {
    console.error('Error:', error);
  }
};

exports.getTotalsUserActivityStatsByWeek = async (req, res) => {
  const userId = req.headers['x-user-id'];

  try {
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');

    console.log("Week start : ", startOfWeek);
    console.log("Week end : ", endOfWeek);

    const activityResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          dateTime: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() }
        }
      },
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
      {
        $match: {
          userId: userId,
          deadline: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() }
        }
      },
      {
        $group: {
          _id: null,
          totalEnergyBurn: { $sum: '$energyBurn' },
          countGoals: { $sum: 1 },
          countGoalsDone: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
          countGoalsCancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancel'] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          totalEnergyBurn: 1,
          countGoals: 1,
          countGoalsDone: 1,
          countGoalsCancelled: 1,
        },
      },
    ]);

    const weeklyActivityTypeResult = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          dateTime: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() }
        }
      },
      {
        $group: {
          _id: { activityType: '$activityType' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          activityType: '$_id.activityType',
          count: 1
        }
      }
    ]);

    const activityData = activityResult.length > 0 ? activityResult[0] : {};
    const goalData = goalResult.length > 0 ? goalResult[0] : {};

    const mergedResult = {
      countActivities: activityData.countActivities || 0,
      totalDuration: activityData.totalDuration || 0,
      totalDistance: activityData.totalDistance || 0,
      totalEnergyBurn: (activityData.totalEnergyBurn || 0) + (goalData.totalEnergyBurn || 0),
      countGoals: goalData.countGoals || 0,
      countGoalsDone: goalData.countGoalsDone || 0,
      countGoalsCancelled: goalData.countGoalsCancelled || 0,
      weeklyActivityTypeStats: weeklyActivityTypeResult,
    };

    console.log('Merged Result:', mergedResult);
    res.send(mergedResult);
  } catch (error) {
    console.error('Error:', error);
  }
};