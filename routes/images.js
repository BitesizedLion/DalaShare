/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get(`/:name`, async (req, res) => {
    try {
        if(!req.params.name) return res.status(500).send("yeah so uhm, this is an api, you know an api?");;
        if (!fs.existsSync(__dirname + `/../images/${req.params.name}.png`)) {
            return res.status(400).send("Cannot find image");
        }

        if (req.query) return res.status(200).sendFile(path.resolve(__dirname + `/../images/${req.params.name}.png`));
    } catch (err) {
        console.log(err);
        res.status(500).send("this shit broken bruh");
    }
});

router.post("/save/:name", async (req, res) => {
    try {
        if(req.headers.token != "ufocoolaf") return res.status(401).send("you arent ufo, you cunt");
        if(!req.body) return res.status(200).send("yeah no bruh, you didnt provide an image");
        if (fs.existsSync(__dirname + `/../images/${req.params.name}`)) {
            return res.status(500).send("Bruh, that image already exists");
        }

        //console.log()
        
        req.files['files[]'].mv(__dirname + `/../images/${req.params.name}`)
        
        if (req.query) return res.status(200).json({name: req.params.name.replace(".png", "")});
    } catch (err) {
        console.log(err);
        res.status(500).send("this shit broken bruh");
    }
});

module.exports = router;