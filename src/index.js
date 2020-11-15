/* jshint esversion: 8 */
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const images = require("./routes/images");

app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/", images);

module.exports = app.listen(80, () => console.log(`listening on port ${80}, amirite`));


