import express, { Request, Response } from "express";
import Booking, { IBooking } from "../models/Booking.js";

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
    const { name, email, phone, date, tour, atvs, passengers, comment } =
      req.body;
    if (!name || !email || !phone || !date || !tour || !atvs) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking: IBooking = new Booking({
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
    return res
      .status(201)
      .json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Booking failed", details: (error as Error).message });
  }
});

export default router;
