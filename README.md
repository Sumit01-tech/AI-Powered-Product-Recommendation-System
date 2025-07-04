# 🧠 AI-Powered Product Recommendation System

## 📝 Introduction
This project is a **rule-based product recommendation system** designed for e-commerce platforms. It analyzes user interactions, product metadata, and business logic to suggest relevant products in real time — **without using machine learning**. The system provides dynamic personalization, cross-selling suggestions, and session-based recommendations to enhance user experience and boost conversions.

## 🔧 Project Type
Fullstack

## 🚀 Deployed App
- **Backend**: https://ai-powered-product-recommendation-system-uwca.onrender.com
- **Database**: https://cloud.mongodb.com

## 📁 Directory Structure
```
ecom-recommender/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── recommendation.controller.js
│   │   │   └── user.controller.js
│   │   ├── routes/
│   │   │   ├── recommendation.routes.js
│   │   │   └── user.routes.js
│   │   └── middlewares/
│   │       ├── auth.middleware.js
│   │       └── error.middleware.js
│   ├── config/
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── logger.js
│   ├── cron/
│   │   └── trending.job.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Interaction.js
│   ├── services/
│   │   ├── recommendation.service.js
│   │   ├── user.service.js
│   │   └── analytics.service.js
│   ├── swagger/
│   │   └── swagger.js
│   ├── utils/
│   │   └── constants.js
│   └── app.js
├── tests/
│   ├── recommendation.test.js
│   └── user.test.js
├── .env
├── package.json
└── README.md according to this generate package.json also added auth.controller file in controller foldernow provide postman request and url also based on this folder structure

## 📹 Video Walkthrough of the Project
_A short demo showcasing main functionality (1–3 mins)_  
📎 [Link to feature walkthrough video]

## 🧑‍💻 Video Walkthrough of the Codebase
_A quick tour of how the code is structured and works (1–5 mins)_  
📎 [Link to codebase walkthrough video]

## ✨ Features
- 🛒 Personalized product recommendations
- 🔁 Session-aware product suggestions
- 📦 Related & cross-sell item recommendations
- 🧠 Rule-based logic (no ML)
- 🔐 JWT-based Authentication
- 📊 Redis caching for performance boost
- 🕓 Cron jobs for periodic cleanup
- 📘 Swagger documentation

## 🧠 Design Decisions & Assumptions
- Uses rule-based filtering logic (e.g., by category, views, cart behavior)
- Redis cache TTL: 3 mins to avoid stale suggestions
- MongoDB is used for product and interaction storage
- Users must be authenticated to receive recommendations
- Admin-only access for system-level actions

## ⚙️ Installation & Getting Started
```bash
# Clone the repository
git clone https://github.com/Sumit01-tech/AI-Powered-Product-Recommendation-System.git
cd AI-Powered-Product-Recommendation-System

# Install backend dependencies
cd backend
npm install

# Create a .env file
cp .env.example .env
# Add your MongoDB URI, PORT, JWT_SECRET, REDIS_URL, etc.

# Start the backend
npm start
```

> To inspect MongoDB schema, use the `/models` folder or connect via Compass/Mongo shell.

## 🧪 Usage

### Example: Fetch Recommendations
```bash
GET /api/recommendations?userId=123
Authorization: Bearer <your-jwt-token>
```

Response:
```json
{
  "recommendations": [
    { "name": "Red Nike Shoes", "price": 120 },
    { "name": "Black Hoodie", "price": 50 }
  ]
}
```

> Use Postman or Swagger UI (`/api-docs`) for testing

## 🔐 Credentials (for testing)
```bash
# Admin
email: admin@example.com
password: Admin@123

# User
email: user@example.com
password: User@123
```

## 🔌 APIs Used
- No third-party APIs.  
- All recommendation logic is internal using product data + Redis cache.

## 📮 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/signup`          | User registration |
| POST   | `/api/auth/login`           | User login |
| GET    | `/api/recommendations`      | Get personalized product suggestions |
| GET    | `/api/products`             | Fetch product list |
| POST   | `/api/interactions`         | Log a user interaction |
| GET    | `/api-docs`                 | Swagger UI for full documentation |

## 🛠️ Technology Stack
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB Atlas
  - Mongoose
  - Redis (ioredis)
  - JWT for auth
  - Swagger for API docs
  - Cron (node-cron)
  - Winston logger
  - 
- **Deployment**:
  - Backend: Render
  - Database: MongoDB Atlas
  - Caching: Redis on Render
