require('dotenv').config();

const express = require('express');
const app = express();

// Import middleware
const helmet = require('helmet');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const log = require('ipfy');

// Import routes
const files = require('./routes/files');

// Use middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(log.logger);
app.set('trust proxy', true);

// Use routes
app.use('/', files);

// Set port and start server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));