import { mongooseConnect } from "@/lib/mongoose";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SK);
const endpointSecret =
  "whsec_418e4320e50af6177af56d36821aa2963d89e548802d75ced2439b823509237b";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

export const config = {
  api: { bodyParser: false },
};
