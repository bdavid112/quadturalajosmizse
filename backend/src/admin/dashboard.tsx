import { useEffect, useState } from "react";
import { Box, H1, H2, Text } from "@adminjs/design-system";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({ totalBookings: 0, totalRevenue: 0 });

  useEffect(() => {
    axios
      .get("/admin/api/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box variant="grey">
      <H1>Admin Dashboard</H1>
      <Box variant="card">
        <H2>Bookings</H2>
        <Text variant="md">Bookings in this month: </Text>
        <Text variant="md">Bookings in previous month: </Text>
        <Text variant="md">Total Bookings: {data.totalBookings}</Text>
      </Box>
      <Box variant="card">
        <H2>Revenue</H2>
        <Text variant="md">Revenue in this month: </Text>
        <Text variant="md">Revenue in previous month: </Text>
        <Text variant="md">Total Revenue: ${data.totalRevenue}</Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
