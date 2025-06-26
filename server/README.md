# ClosetSlays Server

This is the backend server for the ClosetSlays e-commerce website.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the server directory with the following variables:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

3. Replace `sk_test_your_stripe_secret_key` with your actual Stripe secret key from the Stripe dashboard.

## Running the server

```
npm run dev
```

This will start the server on port 3001.

## API Endpoints

- `POST /api/create-checkout-session` - Creates a Stripe checkout session for the items in the cart