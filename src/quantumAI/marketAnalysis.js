const axios = require('axios');
const { log } = require('./utils');
const mlModel = require('./mlModel'); // Placeholder for machine learning model

const API_URL = 'https://api.example.com/marketdata'; // Replace with actual market data API

async function fetchMarketData() {
    try {
        log('Fetching real-time market data...');
        const response = await axios.get(API_URL);
        const marketData = response.data;

        // Validate and structure the market data
        if (!marketData || !marketData.currentPrice || !marketData.currentSupply) {
            throw new Error('Invalid market data received');
        }

        log('Market data fetched successfully.');
        return {
            currentPrice: marketData.currentPrice,
            currentSupply: marketData.currentSupply,
            historicalPrices: marketData.historicalPrices || [], // Optional historical data
        };
    } catch (error) {
        log(`Error fetching market data: ${error.message}`);
        throw error;
    }
}

async function predictTrends(marketData) {
    try {
        log('Predicting market trends using machine learning...');
        const historicalData = marketData.historicalPrices;

        // Ensure we have enough data for prediction
        if (historicalData.length < 10) {
            log('Not enough historical data for prediction.');
            return { trend: 'stable', confidence: 0 };
        }

        // Use the machine learning model to predict future trends
        const prediction = await mlModel.predict(historicalData);
        log('Market trends predicted successfully.');

        return prediction;
    } catch (error) {
        log(`Error predicting market trends: ${error.message}`);
        throw error;
    }
}

module.exports = {
    fetchMarketData,
    predictTrends,
};
