import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

const months = [
  "Jan",
  "Febr",
  "Márc",
  "Ápr",
  "Máj",
  "Jún",
  "Júl",
  "Aug",
  "Szept",
  "Okt",
  "Nov",
  "Dec",
];

function transformRevenueData(raw: { month: number; totalRevenue: number }[]) {
  return months.map((name, index) => {
    const found = raw.find((r) => r.month === index + 1);
    return {
      name,
      revenue: found?.totalRevenue ?? 0,
    };
  });
}

const YearlyRevenueChart = ({
  data,
  isWorseThanLastYear,
}: {
  data: { month: number; totalRevenue: number }[];
  isWorseThanLastYear: boolean;
}) => {
  const chartData = transformRevenueData(data);

  const total = chartData.reduce((sum, entry) => sum + entry.revenue, 0);
  const topMonth = chartData.reduce((max, entry) =>
    entry.revenue > max.revenue ? entry : max
  );
  const topMonthPercentage = Math.round((topMonth.revenue / total) * 100);

  const strokeColor = isWorseThanLastYear ? "#ef4444" : "#4caf50";

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              `${value.toLocaleString()} Ft`,
              "Bevétel",
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={strokeColor}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p>
          Összes bevétel:{" "}
          <strong style={{ fontWeight: "600" }}>
            {total.toLocaleString()} Ft
          </strong>
        </p>
        <p>
          Legjobb hónap:{" "}
          <strong style={{ fontWeight: "600" }}>
            {`${topMonth.name}, ${topMonth.revenue.toLocaleString()}`} Ft
          </strong>
          {` (${topMonthPercentage}% az éves összbevételből)`}
        </p>
      </div>
    </div>
  );
};

export default YearlyRevenueChart;
