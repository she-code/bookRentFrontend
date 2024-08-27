import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useAppSelector } from "../../app/hooks";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AvilableBooksChart = () => {
  // Data for the Doughnut chart

  // Options for the Doughnut chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 20,
          padding: 10,
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    cutout: "70%",
  };

  const { approvedCopies } = useAppSelector((state) => state.books);

  const categoryCounts = approvedCopies.reduce((acc, copy) => {
    const category_name = copy?.book?.Category?.category_name as string;

    // If this category_name is already in the accumulator, increment its count
    if (acc[category_name]) {
      acc[category_name] += 1;
    } else {
      // Otherwise, initialize it to 1
      acc[category_name] = 1;
    }

    return acc;
  }, {});

  // If you need the result as an array
  const result = Object.entries(categoryCounts).map(
    ([category_name, count]) => ({
      category_name,
      count,
    })
  );

  const data = {
    labels: result.map((item) => item.category_name),
    datasets: [
      {
        label: "# of Books",
        data: result.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          // Add more colors if needed
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          // Add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log(result);
  return (
    <div style={{ width: "300px", height: "250px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AvilableBooksChart;
