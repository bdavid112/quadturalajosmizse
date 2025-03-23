import express, { Request, Response } from "express";
import Review, { IReview } from "../models/Review.js";

const router = express.Router();

/* Get all Reviews */
router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const reviews = await Review.find();
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch reviews",
      details: (error as Error).message,
    });
  }
});

/* Get the last 8 reviews */
router.get("/latest", async (_req: Request, res: Response): Promise<any> => {
  try {
    const latestReviews = await Review.find().sort({ createdAt: -1 }).limit(8);
    res.json(latestReviews);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch latest reviews",
      details: (error as Error).message,
    });
  }
});

/* Create a new Review */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, comment, rating } = req.body;
    if (!name || !comment || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newReview: IReview = new Review({
      name,
      comment,
      rating,
    });

    await newReview.save();
    return res
      .status(201)
      .json({ message: "Review created", review: newReview });
  } catch (error) {
    return res.status(500).json({
      error: "Creating review failed",
      details: (error as Error).message,
    });
  }
});

export default router;
