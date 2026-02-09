import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function RecetasPorPais({ data }: { data: { label: string; value: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Cantidad",
        data: data.map((d) => d.value),
        backgroundColor: ["#6b8e23", "#4CAF50", "#2e7d32", "#81c784"],
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

