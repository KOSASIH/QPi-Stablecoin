// src/main/utils/logger.js

const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/app.log');

/**
 * Logs a message to the console and a log file.
 * @param {string} message - The message to log.
 */
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    // Log to console
    console.log(logMessage);

    // Append log message to log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

module.exports = {
    log,
};
