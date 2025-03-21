import Booking from "../models/Booking.js";

export async function getMonthlyRevenueData(year: number) {
  return Booking.aggregate([
    {
      $match: {
        isPaid: true,
        paidAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$paidAt" },
        totalRevenue: { $sum: "$revenue" },
      },
    },
    {
      $project: {
        month: "$_id",
        totalRevenue: 1,
        _id: 0,
      },
    },
    { $sort: { month: 1 } },
  ]);
}
