import { Box, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [400, 450, 300, 500, 600],
      backgroundColor: "#1976d2",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<"bar">) {
          return `$${context.parsed.y.toFixed(2)}`;
        },
      },
    },
  },
};

export default function RevenueChart() {
  return (
    <Box my={4} width="100%">
      <Paper sx={{ height: 300, p: 2, width: "100%", display: "flex" }}>
        <Bar data={data} options={options} />
      </Paper>
    </Box>
  );
}
