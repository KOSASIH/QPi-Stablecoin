// dAppExample/app.js

const Web3 = require('web3');
const config = {
    ETH_NODE_URL: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    QPI_TOKEN_ADDRESS: '0xYourQPiTokenAddress',
    PRIVATE_KEY: 'YOUR_PRIVATE_KEY' // Use with caution
};

const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));
const qpiTokenABI = [ /* ABI of QPiToken contract */ ];

const qpiToken Contract = new web3.eth.Contract(qpiTokenABI, config.QPI_TOKEN_ADDRESS);

document.getElementById('sendTokens').addEventListener('click', async () => {
    const recipient = document.getElementById('recipient').value;
    const amount = web3.utils.toWei(document.getElementById('amount').value, 'ether');

    const account = web3.eth.accounts.privateKeyToAccount(config.PRIVATE_KEY);
    const tx = {
        from: account.address,
        to: config.QPI_TOKEN_ADDRESS,
        gas: 2000000,
        data: qpiTokenContract.methods.transfer(recipient, amount).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, config.PRIVATE_KEY);
    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', (receipt) => {
            document.getElementById('transactionStatus').innerText = `Transaction successful: ${receipt.transactionHash}`;
        })
        .on('error', (error) => {
            document.getElementById('transactionStatus').innerText = `Transaction failed: ${error.message}`;
        });
});
