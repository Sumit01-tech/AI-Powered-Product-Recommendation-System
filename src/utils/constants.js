// =================== constants.js ===================

// User roles
const ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    GUEST: 'guest',
};

// Interaction types
const INTERACTION_TYPES = {
    VIEW: 'view',
    PURCHASE: 'purchase',
    CART: 'cart',
};

// Default cache expiration (in seconds)
const CACHE_EXPIRATION = {
    RECOMMENDATION: 180, // 3 minutes
    TRENDING: 300,        // 5 minutes
};

// Response messages
const MESSAGES = {
    UNAUTHORIZED: 'Unauthorized access.',
    FORBIDDEN: 'Forbidden: insufficient permissions.',
    SERVER_ERROR: 'Something went wrong. Please try again later.',
    NOT_FOUND: 'Resource not found.',
};

module.exports = {
    ROLES,
    INTERACTION_TYPES,
    CACHE_EXPIRATION,
    MESSAGES,
};
