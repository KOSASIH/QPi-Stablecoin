// src/main/services/oracleService.js

const axios = require('axios');
const { log } = require('../utils/logger');

/**
 * Fetches external data from a specified API.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<Object>} - The data retrieved from the API.
 */
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        log(`Data fetched from ${url}`);
        return response.data;
    } catch (error) {
        log(`Error fetching data from ${url}: ${error.message}`);
        throw error;
    }
}

/**
 * Gets the latest price of a cryptocurrency from an external source.
 * @param {string} cryptoSymbol - The symbol of the cryptocurrency (e.g., 'BTC').
 * @returns {Promise<number>} - The latest price of the cryptocurrency.
 */
async function getLatestPrice(cryptoSymbol) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd`;
    const data = await fetchData(url);
    return data[cryptoSymbol].usd;
}

module.exports = {
    fetchData,
    getLatestPrice,
};
