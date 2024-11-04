import Stripe from 'https://cdn.skypack.dev/stripe?dts';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2022-11-15",
});

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Replace "*" with your domain in production
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
    });
  }

  // Handle the actual POST request
  try {
    const body = await req.json();
    const { paymentIntentId, amount } = body;

    if (!paymentIntentId || !amount) {
      throw new Error("PaymentIntent ID and amount are required");
    }

    // Update the Payment Intent
    const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount,
    });

    return new Response(
      JSON.stringify({ clientSecret: updatedPaymentIntent.client_secret }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",  // Replace "*" with your domain in production
        },
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",  // Replace "*" with your domain in production
        },
      }
    );
  }
});
