// src/main/utils/mathUtils.js

/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} value - The number to round.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} - The rounded number.
 */
function roundToDecimals(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Calculates the percentage of a value.
 * @param {number} total - The total value.
 * @param {number} part - The part value.
 * @returns {number} - The percentage of the part relative to the total.
 */
function calculatePercentage(total, part) {
    if (total === 0) return 0;
    return (part / total) * 100;
}

/**
 * Safely adds two numbers, handling potential overflow.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The sum of the two numbers.
 */
function safeAdd(a, b) {
    const result = a + b;
    if (result < a || result < b) {
        throw new Error('Overflow error in addition');
    }
    return result;
}

module.exports = {
    roundToDecimals,
    calculatePercentage,
    safeAdd,
};
