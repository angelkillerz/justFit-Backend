const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin/app');
const firebaseSecretConfig = require('./justfit-secret-config.json');

const authenticator = require("./middlewares/authMiddleware");
const activityRouter = require("./routes/activityRoutes");
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
const statsRouter = require("./routes/statsRoutes");
const authRouter = require("./routes/authRoutes");

require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.cert(firebaseSecretConfig)
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

app.use(authRouter);
app.use(authenticator, userRouter);
app.use(authenticator, activityRouter);
app.use(authenticator, goalRouter);
app.use(authenticator, statsRouter);


// Express and MongoDB initial.
const start = async () => {
    try {
        const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env
        const port = process.env.PORT || 8080;
        app.listen(port, async () => {
            console.log(`Server is running on port ${port}.`);
            await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`, {
                dbName: DB_NAME
            })
            console.log("Connect to mongoDB successfully.");
        });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();