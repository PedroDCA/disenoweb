import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Productos más comprados",
      font: {
        family: 'Arial', 
        size: 25, 
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Arial', 
          size: 15, 
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: 'Arial', 
          size: 15, 
        },
      },
    },
  },
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VendorChart({ productList }) {
  const data = {
    labels: productList.map((product) => product.name),
    datasets: [
      {
        data: productList.map((product) => product.totalSold),
        backgroundColor: 'rgba(75, 0, 130, 0.7)',
        borderWidth: 1,
      },
    ],
  };

  const containerStyle = {
    marginBottom: '30px',
  };

  return (
    <div style={containerStyle}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default VendorChart;
