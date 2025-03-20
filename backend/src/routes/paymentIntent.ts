import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    console.log("✅ Received payment request:", { amount, currency });

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount provided");
    }

    // ✅ Ensure Stripe secret key is loaded
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-02-24.acacia",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("❌ Stripe Payment Error:", error); // Log actual error
    res.status(500).json({ error: error.message });
  }
});

export default router;
