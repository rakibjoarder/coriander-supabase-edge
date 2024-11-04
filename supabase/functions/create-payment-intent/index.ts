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
    const { amount, currency } = body;

    if (!amount || !currency) {
      throw new Error("Amount and currency are required");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return new Response(
      JSON.stringify({
        id: paymentIntent.id,
        paymentIntent:paymentIntent,
        clientSecret: paymentIntent.client_secret,
      }),
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






