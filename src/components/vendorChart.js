// Importación de módulos y elementos de Chart.js y react-chartjs-2
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

// Opciones de configuración del gráfico
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Oculta la leyenda del gráfico
    },
    title: {
      display: true,
      text: "Productos más comprados", // Título del gráfico
      font: {
        family: 'Arial', // Tipo de fuente para el título
        size: 25, // Tamaño de fuente para el título
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Arial', // Tipo de fuente para las etiquetas del eje X
          size: 15, // Tamaño de fuente para las etiquetas del eje X
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: 'Arial', // Tipo de fuente para las etiquetas del eje Y
          size: 15, // Tamaño de fuente para las etiquetas del eje Y
        },
      },
    },
  },
};

// Registro de elementos y escalas para el gráfico
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Componente funcional VendorChart que recibe la lista de productos como propiedad
function VendorChart({ productList }) {
  // Datos para el gráfico
  const data = {
    labels: productList.map((product) => product.name), // Etiquetas del eje X (nombres de productos)
    datasets: [
      {
        data: productList.map((product) => product.totalSold), // Datos del eje Y (cantidad total vendida de cada producto)
        backgroundColor: 'rgba(75, 0, 130, 0.7)', // Color de fondo de las barras del gráfico
        borderWidth: 1, // Ancho del borde de las barras
      },
    ],
  };

  // Estilo de contenedor para el gráfico
  const containerStyle = {
    marginBottom: '30px', // Margen inferior para separar el gráfico de otros elementos
  };

  // Renderizado del componente VendorChart con el gráfico de barras
  return (
    <div style={containerStyle}>
      <Bar data={data} options={options} /> {/* Gráfico de barras */}
    </div>
  );
}

export default VendorChart; // Exporta el componente VendorChart