// scripts/monitor.js

const Web3 = require('web3');
const config = require('../src/main/config');
const { log } = require('../src/main/utils/logger');

const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));

async function monitorEvents() {
    const contractAddress = config.CONTRACT_ADDRESSES.QPiToken; // Change as needed
    const contract = new web3.eth.Contract(require('../src/artifacts/QPiToken.json').abi, contractAddress);

    contract.events.Transfer({
        filter: {}, // You can filter events here
        fromBlock: 'latest'
    })
    .on('data', (event) => {
        log(`Transfer event detected: ${JSON.stringify(event.returnValues)}`);
    })
    .on('error', (error) => {
        console.error(`Error monitoring events: ${error}`);
    });
}

monitorEvents()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
