import { Box, H1, H2, Text } from "@adminjs/design-system";
import YearlyRevenueSection from "./YearlyRevenueSection.js";

const Dashboard = () => {
  return (
    <Box variant="grey">
      <H1>Admin Dashboard</H1>
      <H2>Éves bevétel</H2>
      <Box variant="card">
        <YearlyRevenueSection />
      </Box>
    </Box>
  );
};

export default Dashboard;
