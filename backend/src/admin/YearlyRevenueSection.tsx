import { useEffect, useState } from "react";
import YearlyRevenueChart from "./YearlyRevenueChart.js";

const YearlyRevenueSection = ({}: {}) => {
  const [year, setYear] = useState<number>(2025); // default year
  const [currentYearData, setCurrentYearData] = useState<
    { month: number; totalRevenue: number }[]
  >([]);
  const [previousYearData, setPreviousYearData] = useState<
    { month: number; totalRevenue: number }[]
  >([]);

  useEffect(() => {
    async function fetchRevenue() {
      const [currRes, prevRes] = await Promise.all([
        fetch(`/api/admin/revenue?year=${year}`),
        fetch(`/api/admin/revenue?year=${year - 1}`),
      ]);

      const current = await currRes.json();
      const previous = await prevRes.json();

      setCurrentYearData(current);
      setPreviousYearData(previous);
    }

    fetchRevenue();
  }, [year]);

  const currentTotal = currentYearData.reduce(
    (sum, e) => sum + e.totalRevenue,
    0
  );
  const previousTotal = previousYearData.reduce(
    (sum, e) => sum + e.totalRevenue,
    0
  );

  const isWorseThanLastYear = currentTotal < previousTotal;
  const differencePercentage =
    previousTotal > 0
      ? ((currentTotal - previousTotal) / previousTotal) * 100
      : 0;

  return (
    <div>
      <div
        style={{ width: "100%", paddingBlock: "2rem", position: "relative" }}
      >
        <div style={{ position: "absolute", left: "0", top: "0" }}>
          <span
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginRight: "0.5rem",
            }}
          >
            {year}
          </span>
          <span
            style={{ color: isWorseThanLastYear ? "#ef4444" : "#4caf50" }}
          >{`${isWorseThanLastYear ? "↓" : "↑"} ${differencePercentage.toFixed(
            2
          )}%`}</span>
        </div>
        <select
          onChange={(e) => setYear(Number(e.target.value))}
          value={year} // controlled component (optional)
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            padding: "0.4rem 0.75rem",
            borderRadius: "0.375rem",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            fontSize: "0.875rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            cursor: "pointer",
            appearance: "none",
          }}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>
      <YearlyRevenueChart
        data={currentYearData}
        isWorseThanLastYear={isWorseThanLastYear}
      />
    </div>
  );
};

export default YearlyRevenueSection;
