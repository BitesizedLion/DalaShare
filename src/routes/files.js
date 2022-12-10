require("dotenv").config();

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const rateLimit = require("express-rate-limit");
const MongoStore = require('rate-limit-mongo');


var apiLimiter;

// Determine which rate limiter to use based on the RATELIMIT_TYPE environment variable
if (process.env.RATELIMIT_TYPE === "MONGO_RATELIMIT") {
    // Configure the MongoStore rate limiter with the settings from the environment variables
    apiLimiter = rateLimit({
        store: new MongoStore({
            uri: process.env.MONGO_URI,
            authSource: process.env.MONGO_AUTH_SOURCE,
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            expireTimeMs: process.env.MONGO_EXPIRE_TIME_MS
        }),
        windowMs: process.env.MONGO_RATELIMIT_WINDOW_MS,
        max: process.env.MONGO_RATELIMIT_MAX
    });
} else {
    // Configure the in-memory rate limiter with the settings from the environment variables
    apiLimiter = rateLimit({
        windowMs: process.env.MEM_RATELIMIT_WINDOW_MS,
        max: process.env.MEM_RATELIMIT_MAX
    });
}

const getName = async (req, res) => {
    try {
        if (!req.params.name) return res.status(500).send("This is an API, please provide a file name in the path.");
        if (!fs.existsSync(path.resolve(__dirname, "../../files/", req.params.name))) {
            return res.status(400).send("Cannot find file with the specified name.");
        }

        return res.status(200).sendFile(path.resolve(__dirname, "../../files/", req.params.name));
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while handling the request.");
    }
};

router.get(`/:name`, apiLimiter, getName);
router.get('/', apiLimiter, getName);

router.post("/save/:name", async (req, res) => {
    try {
        if (req.headers.token !== process.env.TOKEN) return res.status(401).send("Invalid token. You are not authorized to access this resource.");
        if (!req.body) return res.status(400).send("Please provide a file to save in the request body.");
        if (fs.existsSync(path.resolve(__dirname, "../../files/", req.params.name))) return res.status(500).send("A file with the specified name already exists.");

        req.files['files[]'].mv(path.resolve(__dirname, "../../files/", req.params.name));

        return res.status(200).json({ name: req.params.name });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while handling the request.");
    }
});

module.exports = router;