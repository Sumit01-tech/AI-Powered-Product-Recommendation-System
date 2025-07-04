require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

async function start() {
    try {
        await connectDB(); // ✅ Connect to MongoDB
        require('./cron/trending.job'); // Start cron if needed
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error('Startup error:', err);
        process.exit(1);
    }
}

start();
