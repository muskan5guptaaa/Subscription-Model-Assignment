📦 Subscription Backend


A simple backend built with Node.js, Express, and MongoDB for managing users, subscription plans, and user subscriptions.

🚀 Features
User signup & login with JWT

Create and list subscription plans

Subscribe to a plan

Cancel or update subscription


📬 API Endpoints
Auth
POST /signup → Register user

POST /login → Login user

Plans
POST /plans → Create a plan

GET /plans → Get all plans

Subscriptions
POST /subscriptions → Create subscription

GET /subscriptions/:userId → Get user's subscription

PUT /subscriptions/:userId → Update subscription

DELETE /subscriptions/:userId → Cancel subscription

✅ All subscription routes require Bearer Token Auth.

🧪 Test with Postman
Register → Login → Copy token

Use token in Authorization: Bearer <token> for protected
