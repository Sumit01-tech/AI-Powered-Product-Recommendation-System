const cron = require('node-cron');
const recSvc = require('../services/recommendation.service');

cron.schedule('*/5 * * * *', async () => {
    await recSvc.getTrendingProducts();
    console.log('Trending cache updated');
});
