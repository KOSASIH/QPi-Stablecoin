const axios = require('axios');
const { log, handleError } = require('../quantumAI/utils');

const API_URL = 'https://api.example.com/marketdata'; // Replace with actual market data API
let cachedMarketData = null;
let lastFetchTime = null;
const CACHE_EXPIRY = 60000; // Cache expiry time in milliseconds (1 minute)

/**
 * Fetch real-time market data from the external API.
 * @returns {Promise<Object>} - The market data.
 */
async function getMarketData() {
    try {
        // Check if cached data is still valid
        if (cachedMarketData && lastFetchTime && (Date.now() - lastFetchTime < CACHE_EXPIRY)) {
            log('Using cached market data.');
            return cachedMarketData;
        }

        log('Fetching real-time market data from API...');
        const response = await axios.get(API_URL);
        const marketData = response.data;

        // Validate the fetched market data
        validateMarketData(marketData);

        // Cache the market data and update the fetch time
        cachedMarketData = marketData;
        lastFetchTime = Date.now();
        log('Market data fetched and cached successfully.');

        return marketData;
    } catch (error) {
        handleError(error, true); // Log and rethrow the error
    }
}

/**
 * Validate the structure of the market data.
 * @param {Object} marketData - The market data to validate.
 * @throws Will throw an error if the market data is invalid.
 */
function validateMarketData(marketData) {
    if (!marketData || typeof marketData.currentPrice !== 'number' || typeof marketData.currentSupply !== 'number') {
        throw new Error('Invalid market data structure');
    }
}

module.exports = {
    getMarketData,
};
