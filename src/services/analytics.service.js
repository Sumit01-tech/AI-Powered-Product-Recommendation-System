const Interaction = require('../models/Interaction');
const Product = require('../models/Product');

exports.getTopViewedProducts = async () => {
    const result = await Interaction.aggregate([
        { $match: { type: 'view' } },
        { $group: { _id: '$productId', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        {
            $project: {
                _id: 0,
                productId: '$_id',
                views: 1,
                name: '$product.name',
                category: '$product.category'
            }
        }
    ]);

    return result;
};

exports.getUserInteractionStats = async (userId) => {
    const stats = await Interaction.aggregate([
        { $match: { userId } },
        { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const formatted = {};
    stats.forEach(item => {
        formatted[item._id] = item.count;
    });

    return formatted;
};
