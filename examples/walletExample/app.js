// walletExample/app.js

const Web3 = require('web3');
const config = {
    ETH_NODE_URL: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    QPI_TOKEN_ADDRESS: '0xYourQPiTokenAddress'
};

const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));
const qpiTokenABI = [ /* ABI of QPiToken contract */ ];

const qpiTokenContract = new web3.eth.Contract(qpiTokenABI, config.QPI_TOKEN_ADDRESS);

document.getElementById('getBalance').addEventListener('click', async () => {
    const address = document.getElementById('address').value;
    const balance = await qpiTokenContract.methods.balanceOf(address).call();
    document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether');
});
