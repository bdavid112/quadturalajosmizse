import express, { Request, Response } from "express";
import Tour, { ITour } from "../models/Tour.js";

const router = express.Router();

/* Get all Tours */
router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const tours = await Tour.find();
    return res.json(tours);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch tours",
      details: (error as Error).message,
    });
  }
});

/* Gett Tour by ID */
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    return res.json(tour);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch tour",
      details: (error as Error).message,
    });
  }
});

/* Create a new Tour */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      name,
      title,
      descriptionShort,
      descriptionLong,
      attributes,
      buttonPrimary,
      buttonSecondary,
      prices,
    } = req.body;
    if (
      !name ||
      !title ||
      !descriptionShort ||
      !descriptionLong ||
      !attributes ||
      !buttonPrimary ||
      !buttonSecondary ||
      !prices
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTour: ITour = new Tour({
      localizedTitle: name.hu,
      name,
      title,
      descriptionShort,
      descriptionLong,
      attributes,
      buttonPrimary,
      buttonSecondary,
      prices,
    });

    await newTour.save();
    return res.status(201).json({ message: "Tour created", tour: newTour });
  } catch (error) {
    return res.status(500).json({
      error: "Creating tour failed",
      details: (error as Error).message,
    });
  }
});

export default router;
