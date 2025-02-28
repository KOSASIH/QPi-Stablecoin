// Configuration settings for the Quantum AI Engine

const CONFIG = {
    // Target price for Pi Coin
    TARGET_PRICE: 314159.00, // Target price in USD

    // Market data API settings
    MARKET_DATA_API: {
        BASE_URL: 'https://api.example.com', // Base URL for the market data API
        ENDPOINT: '/marketdata',              // Endpoint for fetching market data
        API_KEY: process.env.MARKET_DATA_API_KEY, // API key for authentication (use environment variable)
        TIMEOUT: 5000,                        // Timeout for API requests in milliseconds
    },

    // Logging settings
    LOGGING: {
        LEVEL: 'info',                        // Log level (e.g., 'info', 'debug', 'error')
        ENABLED: true,                        // Enable or disable logging
    },

    // Prediction model settings
    PREDICTION_MODEL: {
        MODEL_PATH: './models/predictionModel.json', // Path to the trained prediction model
        UPDATE_INTERVAL: 86400000,            // Interval to update the prediction model (in milliseconds)
    },

    // Other settings can be added here as needed
};

module.exports = CONFIG;
