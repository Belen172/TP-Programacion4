import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export function RecetasPorCategoria({ data }: { data: { label: string; value: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Recetas",
        data: data.map((d) => d.value),
        backgroundColor: ["#81C784", "#4DB6AC", "#64B5F6", "#BA68C8", "#FFD54F"],
      },
    ],
  };

  return <Doughnut data={chartData} />;
}

