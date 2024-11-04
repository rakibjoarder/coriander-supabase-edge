
# Supabase Stripe Payment Integration

This guide walks you through setting up a local Supabase environment and creating an Edge Function to handle Stripe payments. This setup allows you to run Supabase services locally and deploy a Stripe payment function to your Supabase project.

## Prerequisites

- Docker installed and running
- Supabase CLI installed (use `npm install -g supabase` if you haven't installed it yet)
- A Stripe account and Secret Key

## Steps

### 1. Start Supabase Locally

To start Supabase services locally, use the following command:

```sh
npx supabase start
```

This command will spin up the necessary containers (PostgreSQL and other Supabase services). Once started, you can access the Supabase services at:
- **API**: `http://localhost:54321`
- **Database**: `http://localhost:54322`

### 2. Create Your Edge Function for Stripe

Next, create an Edge Function to handle Stripe payment requests.

```sh
supabase functions new create-payment-intent
```

This command will create a new folder in your project structure at `supabase/functions/create-payment-intent`.

### 3. Add Stripe Dependency

Navigate to the function's directory and initialize a `package.json` file. Then, install the Stripe library:

```sh
cd supabase/functions/create-payment-intent
npm init -y
npm install stripe
```

### 4. Set Up Your Stripe Secret Key Locally

To test the function locally, create a `.env` file in the `supabase/functions/create-payment-intent` directory and add your Stripe Secret Key:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Make sure to replace `your_stripe_secret_key` with your actual Stripe secret key.

### 5. Test the Edge Function Locally

To test the Edge Function locally, use the following command:

```sh
npx supabase functions serve create-payment-intent
```

This command will start the function locally, allowing you to test its behavior. 

### 6. Deploy the Edge Function

Once the function is working locally, return to the root directory of your Supabase project and deploy the function to Supabase:

```sh
supabase functions deploy create-payment-intent
```

After deployment, Supabase will provide a URL for your function, such as:

```
https://<your-project-id>.supabase.co/functions/v1/create-payment-intent
```

### 7. Test the Deployed Edge Function

You can test the deployed function using `curl` or directly from your Flutter app. Here’s an example using `curl`:

```sh
curl -X POST 'https://<your-project-id>.supabase.co/functions/v1/create-payment-intent' \
  -H 'Authorization: Bearer [YOUR_ANON_KEY]' \
  -H 'Content-Type: application/json' \
  --data '{"amount": 1000, "currency": "usd"}'
```

Replace `[YOUR_ANON_KEY]` with your Supabase project's anon key and adjust the amount and currency as needed.

---

## Stopping Supabase

To stop the local Supabase environment, run:

```sh
npx supabase stop
```

This command will stop and remove the Docker containers used for Supabase.

## Additional Notes

- **Environment Variables**: Make sure to keep your `.env` file secure and never commit it to version control.
- **Stripe Configuration**: Ensure your Stripe secret key is valid and corresponds to your project’s configuration.

---

This README provides a full guide to setting up Supabase Edge Functions for Stripe payments locally and deploying them to Supabase. Enjoy integrating Stripe payments with Supabase!
