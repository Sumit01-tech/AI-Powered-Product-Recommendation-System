const Product = require('../models/Product');
const Interaction = require('../models/Interaction');

// Rule-based: Collaborative filtering from views and purchases
const getCollaborativeRecommendations = async (userId) => {
    if (!userId) throw new Error('User ID is required');

    const interactions = await Interaction.find({ userId });

    const viewedProductIds = interactions
        .filter(i => i.type === 'view')
        .map(i => i.productId?.toString());

    const purchasedProductIds = interactions
        .filter(i => i.type === 'purchase')
        .map(i => i.productId?.toString());

    const productIds = [...new Set([...viewedProductIds, ...purchasedProductIds])].filter(Boolean);

    return Product.find({ _id: { $in: productIds } }).limit(10);
};

// Trending: Based on popularity score
const getTrendingProducts = async () => {
    return Product.find().sort({ popularityScore: -1 }).limit(10);
};

// Content-based: Find similar products based on category & brand
const getSimilarProducts = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) return [];

    return Product.find({
        _id: { $ne: productId },
        category: product.category,
        brand: product.brand
    }).limit(5);
};

// Get recommendations based on previous user interactions (content-based)
const getSimilarProductsFromInteractions = async (userId) => {
    const interactions = await Interaction.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const productIds = interactions.map(i => i.productId?.toString()).filter(Boolean);

    const similarResults = [];
    for (const id of productIds) {
        const similar = await getSimilarProducts(id);
        similarResults.push(...similar);
    }

    // Deduplicate
    const unique = Array.from(new Map(similarResults.map(p => [p._id.toString(), p])).values());

    return unique.slice(0, 10);
};

module.exports = {
    getCollaborativeRecommendations,
    getTrendingProducts,
    getSimilarProducts,
    getSimilarProductsFromInteractions // ✅ used in controller
};
