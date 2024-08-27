import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Paper } from "@mui/material";
import { groupRentByMonth } from "../../utils";
import { Rent } from "../../types/rentType";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const SmoothAreaChart = (props: { rents: Rent[] }) => {
  const { rents } = props;
  const { labels, data } = groupRentByMonth(rents);
  const chartData = {
    labels: labels,

    datasets: [
      {
        label: "Monthly Sales",
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    title: "Earning Summary",
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 2,
    //   cutout: "80%",
  };
  return (
    <Paper sx={{ boxShadow: "none", borderRadius: 5, mt: 3, height: "50%" }}>
      <Box sx={{ height: "400px", width: "100%" }}>
        {" "}
        <Line data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default SmoothAreaChart;
