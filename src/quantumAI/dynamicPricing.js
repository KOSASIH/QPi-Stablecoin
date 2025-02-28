const { log } = require('./utils');

/**
 * Calculate adjustments to maintain the target price of Pi Coin.
 * @param {Object} marketData - The current market data.
 * @param {number} targetPrice - The target price for Pi Coin.
 * @returns {Object} - An object containing the adjustment and new supply.
 */
function calculateAdjustments(marketData, targetPrice) {
    const currentPrice = marketData.currentPrice;
    const currentSupply = marketData.currentSupply;

    // Calculate the price difference and adjustment factor
    const priceDifference = targetPrice - currentPrice;
    const adjustmentFactor = priceDifference / targetPrice;

    // Calculate new supply based on adjustment factor
    const newSupply = currentSupply + (currentSupply * adjustmentFactor);

    // Log the calculations for debugging
    log(`Current Price: ${currentPrice}, Target Price: ${targetPrice}`);
    log(`Price Difference: ${priceDifference}, Adjustment Factor: ${adjustmentFactor}`);
    log(`New Supply Calculation: ${newSupply}`);

    return {
        adjustment: adjustmentFactor,
        newSupply: Math.max(newSupply, 0), // Ensure supply cannot be negative
    };
}

/**
 * Adjust supply based on predicted market trends.
 * @param {Object} marketData - The current market data.
 * @param {number} targetPrice - The target price for Pi Coin.
 * @param {Object} predictions - The predicted market trends.
 * @returns {Object} - An object containing the adjustment and new supply.
 */
function adjustForPredictions(marketData, targetPrice, predictions) {
    const currentSupply = marketData.currentSupply;

    // Adjust supply based on predicted trend
    let adjustmentFactor = 0;

    if (predictions.trend === 'upward') {
        adjustmentFactor = 0.05; // Increase supply by 5% for upward trends
    } else if (predictions.trend === 'downward') {
        adjustmentFactor = -0.05; // Decrease supply by 5% for downward trends
    }

    const newSupply = currentSupply * (1 + adjustmentFactor);

    log(`Predicted Trend: ${predictions.trend}, Adjustment Factor: ${adjustmentFactor}`);
    log(`New Supply after Prediction Adjustment: ${newSupply}`);

    return {
        adjustment: adjustmentFactor,
        newSupply: Math.max(newSupply, 0), // Ensure supply cannot be negative
    };
}

module.exports = {
    calculateAdjustments,
    adjustForPredictions,
};
