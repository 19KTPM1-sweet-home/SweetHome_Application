/** @format */

const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB successfully');
    } catch (error) {
        console.log('Connected to DB failed');
    }
}

module.exports = {connect};