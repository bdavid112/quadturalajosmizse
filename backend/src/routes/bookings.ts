import express, { Request, Response } from "express";
import Booking, { IBooking } from "../models/Booking.js";
import Tour from "../models/Tour.js";

const router = express.Router();

/* Get all Bookings */
router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const bookings = await Booking.find();
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch bookings",
      details: (error as Error).message,
    });
  }
});

/* Create a new Booking */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      name,
      email,
      phone,
      date,
      tourId,
      atvs,
      passengers,
      comment,
      paidAt,
      isPaid,
    } = req.body;
    if (!name || !email || !phone || !date || !tourId || !atvs) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const tour = await Tour.findById(tourId);
    if (!tour) {
      throw new Error("Tour not found");
    }

    const tourPrices = tour.prices;
    const revenue =
      atvs * tourPrices.atvPrice + passengers * tourPrices.passengerPrice;

    const newBooking: IBooking = new Booking({
      name,
      email,
      phone,
      date: new Date(date),
      tourId,
      atvs,
      passengers,
      comment,
      revenue,
      paidAt,
      isPaid,
    });

    await newBooking.save();
    return res
      .status(201)
      .json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Booking failed", details: (error as Error).message });
  }
});

/* Create many new Bookings */
router.post("/bulk", async (req, res) => {
  try {
    const bookings = req.body;
    const inserted = await Booking.insertMany(bookings);
    res.status(201).json(inserted);
  } catch (err) {
    console.error("Bulk insert failed:", err);
    res.status(500).json({ error: "Failed to insert bookings" });
  }
});

export default router;
