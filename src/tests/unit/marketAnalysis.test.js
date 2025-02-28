const marketAnalysis = require('../../quantumAI/marketAnalysis');
const axios = require('axios');
const { log } = require('../../quantumAI/utils');

// Mock the axios module
jest.mock('axios');

describe('Market Analysis Module', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('fetchMarketData', () => {
        it('should fetch market data successfully', async () => {
            const mockData = {
                currentPrice: 310000,
                currentSupply: 1000000,
                historicalPrices: [300000, 305000, 310000],
            };

            axios.get.mockResolvedValue({ data: mockData });

            const result = await marketAnalysis.fetchMarketData();

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith('https://api.example.com/marketdata'); // Ensure correct API URL
            expect(log).toHaveBeenCalledWith('Market data fetched and cached successfully.');
        });

        it('should throw an error for invalid market data structure', async () => {
            axios.get.mockResolvedValue({ data: {} }); // Invalid data

            await expect(marketAnalysis.fetchMarketData()).rejects.toThrow('Invalid market data structure');
            expect(log).toHaveBeenCalledWith('Error fetching market data: Invalid market data structure');
        });

        it('should handle API errors gracefully', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(marketAnalysis.fetchMarketData()).rejects.toThrow(errorMessage);
            expect(log).toHaveBeenCalledWith(`Error fetching market data: ${errorMessage}`);
        });
    });

    describe('predictTrends', () => {
        it('should predict market trends successfully', async () => {
            const mockHistoricalData = [300000, 305000, 310000, 315000, 320000];
            const mockPrediction = { trend: 'upward', confidence: 85 };

            // Mock the machine learning model's predict function
            const mlModel = require('../../quantumAI/mlModel');
            mlModel.predict = jest.fn().mockResolvedValue(mockPrediction);

            const result = await marketAnalysis.predictTrends({ historicalPrices: mockHistoricalData });

            expect(result).toEqual(mockPrediction);
            expect(mlModel.predict).toHaveBeenCalledWith(mockHistoricalData);
            expect(log).toHaveBeenCalledWith('Market trends predicted successfully.');
        });

        it('should return stable trend if not enough historical data', async () => {
            const result = await marketAnalysis.predictTrends({ historicalPrices: [] });

            expect(result).toEqual({ trend: 'stable', confidence: 0 });
            expect(log).toHaveBeenCalledWith('Not enough historical data for prediction.');
        });

        it('should handle prediction errors gracefully', async () => {
            const mockHistoricalData = [300000, 305000, 310000];
            const errorMessage = 'Prediction Error';

            // Mock the machine learning model's predict function to throw an error
            const mlModel = require('../../quantumAI/mlModel');
            mlModel.predict = jest.fn().mockRejectedValue(new Error(errorMessage));

            await expect(marketAnalysis.predictTrends({ historicalPrices: mockHistoricalData })).rejects.toThrow(errorMessage);
            expect(log).toHaveBeenCalledWith(`Error predicting market trends: ${errorMessage}`);
        });
    });
});
