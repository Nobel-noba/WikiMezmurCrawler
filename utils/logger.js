const fs = require("fs");

const path = require("path");

const logFile = path.join(__dirname, "..", "logs", "scraper.log");

function log(message) {

    const text =
        `[${new Date().toISOString()}] ${message}`;

    console.log(text);

    fs.appendFileSync(logFile, text + "\n");

}

module.exports = log;