const recSvc = require('../../services/recommendation.service');

exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            console.warn('❗ No userId found in request');
            return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
        }

        console.log('📥 Getting recommendations for User ID:', userId);

        // Fetch trending products
        let trending = [];
        try {
            trending = await recSvc.getTrendingProducts();
            console.log(`🔥 Trending products fetched: ${trending.length}`);
        } catch (err) {
            console.error('❌ Error fetching trending products:', err.message);
        }

        // Collaborative filtering recommendations
        let collab = [];
        try {
            collab = await recSvc.generateRecommendations(userId);
            console.log(`🤝 Collaborative recommendations fetched: ${collab.length}`);
        } catch (err) {
            console.error('❌ Error in collaborative recommendations:', err.message);
        }

        // Content-based recommendations
        let content = [];
        try {
            content = await recSvc.getSimilarProductsFromInteractions(userId);
            console.log(`📚 Content-based recommendations fetched: ${content.length}`);
        } catch (err) {
            console.error('❌ Error in content-based recommendations:', err.message);
        }

        res.status(200).json({ trending, collab, content });
    } catch (err) {
        console.error('❌ getRecommendations failed:', err.message || err);
        res.status(500).json({ error: 'Failed to get recommendations' });
    }
};

exports.getTrendingProducts = async (req, res) => {
    try {
        const trending = await recSvc.getTrendingProducts();
        console.log(`🔥 Trending products returned: ${trending.length}`);
        res.status(200).json(trending);
    } catch (err) {
        console.error('❌ getTrendingProducts failed:', err.message || err);
        res.status(500).json({ error: 'Failed to fetch trending products' });
    }
};
