import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChart({
  labels,
  values,
  dataLabel,
  title,
}: {
  labels: string[]
  values: number[]
  dataLabel: string
  title?: string
}) {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: title ? true : false,
        text: title,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: dataLabel,
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return <Bar data={data} options={options} />
}
