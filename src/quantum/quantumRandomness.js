// src/quantum/quantumRandomness.js

const { exec } = require('child_process');

/**
 * Generates quantum random numbers using an external quantum random number generator.
 * @param {number} count - The number of random numbers to generate.
 * @returns```javascript
 * @returns {Promise<number[]>} - An array of generated random numbers.
 */
function generateQuantumRandomNumbers(count) {
    return new Promise((resolve, reject) => {
        exec(`path/to/quantum/random/generator --count ${count}`, (error, stdout, stderr) => {
            if (error) {
                return reject(`Error generating random numbers: ${stderr}`);
            }
            const randomNumbers = stdout.split('\n').map(Number).filter(Boolean);
            resolve(randomNumbers);
        });
    });
}

module.exports = {
    generateQuantumRandomNumbers,
};
