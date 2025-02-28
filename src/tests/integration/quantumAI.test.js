const quantumAIEngine = require('../../quantumAI/index');
const marketAnalysis = require('../../quantumAI/marketAnalysis');
const transactionService = require('../../services/transactionService');
const { log } = require('../../quantumAI/utils');

// Mock the necessary modules
jest.mock('../../quantumAI/marketAnalysis');
jest.mock('../../services/transactionService');

describe('Quantum AI Engine Integration Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should analyze market and adjust supply correctly', async () => {
        // Mock market data
        const mockMarketData = {
            currentPrice: 310000,
            currentSupply: 1000000,
            historicalPrices: [300000, 305000, 310000],
        };

        // Mock the fetchMarketData function to return mock data
        marketAnalysis.fetchMarketData.mockResolvedValue(mockMarketData);

        // Mock the predictTrends function to return a predicted upward trend
        marketAnalysis.predictTrends.mockResolvedValue({ trend: 'upward', confidence: 85 });

        // Mock the adjustSupply function to simulate supply adjustment
        transactionService.adjustSupply.mockResolvedValue();

        // Run the Quantum AI Engine
        await quantumAIEngine.analyzeMarket();

        // Verify that market data was fetched
        expect(marketAnalysis.fetchMarketData).toHaveBeenCalled();
        expect(log).toHaveBeenCalledWith('Fetching market data...');

        // Verify that trends were predicted
        expect(marketAnalysis.predictTrends).toHaveBeenCalledWith(mockMarketData);
        expect(log).toHaveBeenCalledWith('Predicting market trends using machine learning...');

        // Verify that the supply was adjusted based on the predicted trend
        expect(transactionService.adjustSupply).toHaveBeenCalled();
        expect(log).toHaveBeenCalledWith(expect.stringContaining('Adjusting supply to:'));
    });

    it('should handle errors during market analysis gracefully', async () => {
        // Mock the fetchMarketData function to throw an error
        marketAnalysis.fetchMarketData.mockRejectedValue(new Error('Network Error'));

        // Run the Quantum AI Engine and expect it to throw an error
        await expect(quantumAIEngine.analyzeMarket()).rejects.toThrow('Network Error');

        // Verify that the error was logged
        expect(log).toHaveBeenCalledWith('Error in market analysis: Network Error');
    });

    it('should handle errors during supply adjustment gracefully', async () => {
        // Mock market data
        const mockMarketData = {
            currentPrice: 310000,
            currentSupply: 1000000,
            historicalPrices: [300000, 305000, 310000],
        };

        // Mock the fetchMarketData function to return mock data
        marketAnalysis.fetchMarketData.mockResolvedValue(mockMarketData);

        // Mock the predictTrends function to return a predicted upward trend
        marketAnalysis.predictTrends.mockResolvedValue({ trend: 'upward', confidence: 85 });

        // Mock the adjustSupply function to throw an error
        transactionService.adjustSupply.mockRejectedValue(new Error('Transaction Error'));

        // Run the Quantum AI Engine and expect it to throw an error
        await expect(quantumAIEngine.analyzeMarket()).rejects.toThrow('Transaction Error');

        // Verify that the error was logged
        expect(log).toHaveBeenCalledWith('Error in market analysis: Transaction Error');
    });
});
