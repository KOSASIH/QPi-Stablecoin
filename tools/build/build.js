// tools/build/build.js

const { exec } = require('child_process');

function buildContracts() {
    exec('npx hardhat compile', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during build: ${stderr}`);
            return;
        }
        console.log(`Build output:\n${stdout}`);
    });
}

buildContracts();
