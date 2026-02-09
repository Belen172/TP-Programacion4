import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function IngredientesMasUsados({ data }: { data: { label: string; value: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Usos",
        data: data.map((d) => d.value),
        backgroundColor: ["#f44336", "#ff9800", "#4caf50", "#2196f3", "#9c27b0"],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}
