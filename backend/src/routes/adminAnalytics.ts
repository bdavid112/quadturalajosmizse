import express from "express";
import { getMonthlyRevenueData } from "../admin/analytics.js";

const router = express.Router();

router.get("/revenue", async (req, res) => {
  const year = parseInt(req.query.year as string) || new Date().getFullYear();
  const data = await getMonthlyRevenueData(year);
  res.json(data);
});

export default router;
