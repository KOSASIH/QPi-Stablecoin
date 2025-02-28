const marketAnalysis = require('./marketAnalysis');
const dynamicPricing = require('./dynamicPricing');
const { log } = require('./utils');
const transactionService = require('../services/transactionService');

class QuantumAIEngine {
    constructor() {
        this.targetPrice = 314159; // Target price for Pi Coin
        this.marketData = null;
    }

    async analyzeMarket() {
        try {
            log('Fetching market data...');
            this.marketData = await marketAnalysis.fetchMarketData();
            log('Market data fetched successfully.');

            const adjustments = dynamicPricing.calculateAdjustments(this.marketData, this.targetPrice);
            await this.adjustSupply(adjustments.newSupply);
            return adjustments;
        } catch (error) {
            log(`Error in market analysis: ${error.message}`);
            throw error;
        }
    }

    async adjustSupply(newSupply) {
        try {
            log(`Adjusting supply to: ${newSupply}`);
            await transactionService.adjustSupply(newSupply);
            log('Supply adjusted successfully.');
        } catch (error) {
            log(`Error adjusting supply: ${error.message}`);
            throw error;
        }
    }

    async predictMarketTrends() {
        try {
            log('Predicting market trends...');
            const predictions = await marketAnalysis.predictTrends(this.marketData);
            log('Market trends predicted successfully.');
            return predictions;
        } catch (error) {
            log(`Error predicting market trends: ${error.message}`);
            throw error;
        }
    }

    async run() {
        log('Starting Quantum AI Engine...');
        while (true) {
            try {
                const adjustments = await this.analyzeMarket();
                log(`Adjustments made: ${JSON.stringify(adjustments)}`);

                const predictions = await this.predictMarketTrends();
                log(`Predicted trends: ${JSON.stringify(predictions)}`);

                // Sleep for a defined interval before the next analysis
                await this.sleep(60000); // 1 minute
            } catch (error) {
                log(`Error in Quantum AI Engine: ${error.message}`);
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new QuantumAIEngine();
