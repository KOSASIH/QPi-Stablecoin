// scripts/audit.js

const { exec } = require('child_process');

async function runAudit() {
    exec('npx solhint "contracts/**/*.sol" && npx slither .', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running audit: ${stderr}`);
            return;
        }
        console.log(`Audit results:\n${stdout}`);
    });
}

runAudit()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
