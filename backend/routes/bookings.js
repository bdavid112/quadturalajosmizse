import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* Get all bookings */
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);

  console.log("📩 Received GET Request to /api/bookings");
});

/* Create a new booking */
router.post("/", async (req, res) => {
  console.log("📩 Received POST Request to /api/bookings");
  console.log("📦 Request Body:", req.body); // 🔍 Debug

  try {
    const { name, email, phone, date, tour, atvs, passengers, comment } =
      req.body;
    const newBooking = new Booking({
      name,
      email,
      phone,
      date,
      tour,
      atvs,
      passengers,
      comment,
    });
    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking create successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Booking failed", details: error.message });
  }
});

export default router;
