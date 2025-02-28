/**
 * Utility functions for the Quantum AI Engine.
 */

/**
 * Log messages with a timestamp.
 * @param {string} message - The message to log.
 */
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

/**
 * Handle errors by logging them and optionally throwing.
 * @param {Error} error - The error to handle.
 * @param {boolean} [shouldThrow=false] - Whether to rethrow the error after logging.
 */
function handleError(error, shouldThrow = false) {
    log(`Error: ${error.message}`);
    if (shouldThrow) {
        throw error;
    }
}

/**
 * Validate market data structure.
 * @param {Object} marketData - The market data to validate.
 * @throws Will throw an error if the market data is invalid.
 */
function validateMarketData(marketData) {
    if (!marketData || typeof marketData.currentPrice !== 'number' || typeof marketData.currentSupply !== 'number') {
        throw new Error('Invalid market data structure');
    }
}

/**
 * Normalize price data to a standard format.
 * @param {number} price - The price to normalize.
 * @returns {number} - The normalized price.
 */
function normalizePrice(price) {
    return parseFloat(price.toFixed(2)); // Normalize to two decimal places
}

/**
 * Calculate percentage change between two values.
 * @param {number} oldValue - The old value.
 * @param {number} newValue - The new value.
 * @returns {number} - The percentage change.
 */
function calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0) return 0; // Avoid division by zero
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

module.exports = {
    log,
    handleError,
    validateMarketData,
    normalizePrice,
    calculatePercentageChange,
};
