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
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default VendorChart;
