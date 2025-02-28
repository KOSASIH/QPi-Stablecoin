const dynamicPricing = require('../../quantumAI/dynamicPricing');
const { log } = require('../../quantumAI/utils');

describe('Dynamic Pricing Module', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('calculateAdjustments', () => {
        it('should calculate adjustments correctly for target price', () => {
            const marketData = {
                currentPrice: 310000,
                currentSupply: 1000000,
            };
            const targetPrice = 314159;

            const result = dynamicPricing.calculateAdjustments(marketData, targetPrice);

            expect(result).toEqual({
                adjustment: expect.any(Number),
                newSupply: expect.any(Number),
            });
            expect(result.newSupply).toBeGreaterThan(0); // Ensure new supply is positive
            expect(log).toHaveBeenCalledWith(`Current Price: ${marketData.currentPrice}, Target Price: ${targetPrice}`);
        });

        it('should handle negative current price gracefully', () => {
            const marketData = {
                currentPrice: -100000,
                currentSupply: 1000000,
            };
            const targetPrice = 314159;

            const result = dynamicPricing.calculateAdjustments(marketData, targetPrice);

            expect(result).toEqual({
                adjustment: expect.any(Number),
                newSupply: expect.any(Number),
            });
            expect(result.newSupply).toBeGreaterThan(0); // Ensure new supply is positive
        });

        it('should not allow negative new supply', () => {
            const marketData = {
                currentPrice: 400000,
                currentSupply: 1000000,
            };
            const targetPrice = 314159;

            const result = dynamicPricing.calculateAdjustments(marketData, targetPrice);

            expect(result.newSupply).toBe(0); // Ensure new supply cannot be negative
        });
    });

    describe('adjustForPredictions', () => {
        it('should adjust supply for upward trend', () => {
            const marketData = {
                currentPrice: 310000,
                currentSupply: 1000000,
            };
            const targetPrice = 314159;
            const predictions = { trend: 'upward', confidence: 85 };

            const result = dynamicPricing.adjustForPredictions(marketData, targetPrice, predictions);

            expect(result).toEqual({
                adjustment: 0.05, // 5% increase
                newSupply: 1050000, // New supply after adjustment
            });
            expect(log).toHaveBeenCalledWith(`Predicted Trend: ${predictions.trend}, Adjustment Factor: 0.05`);
        });

        it('should adjust supply for downward trend', () => {
            const marketData = {
                currentPrice: 310000,
                currentSupply: 1000000,
            };
            const targetPrice = 314159;
            const predictions = { trend: 'downward', confidence: 70 };

            const result = dynamicPricing.adjustForPredictions(marketData, targetPrice, predictions);

            expect(result).toEqual({
                adjustment: -0.05, // 5% decrease
                newSupply: 950000, // New supply after adjustment
            });
            expect(log).toHaveBeenCalledWith(`Predicted Trend: ${predictions.trend}, Adjustment Factor: -0.05`);
        });

        it('should not allow negative new supply for downward trend', () => {
            const marketData = {
                currentPrice: 310000,
                currentSupply: 100000,
            };
            const targetPrice = 314159;
            const predictions = { trend: 'downward', confidence: 70 };

            const result = dynamicPricing.adjustForPredictions(marketData, targetPrice, predictions);

            expect(result.newSupply).toBe(0); // Ensure new supply cannot be negative
        });
    });
});
