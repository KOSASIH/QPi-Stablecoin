// scripts/setup.js

require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
    // Connect to MongoDB
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/qpi-stablecoin';
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Additional setup tasks can be added here
    console.log('Setup completed successfully');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
