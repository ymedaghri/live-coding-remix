import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



export default function AreaChart({ labels, values, dataLabel, title }: { labels: string[], values: number[], dataLabel: string, title?: string }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: title ? true : false,
        text: title,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: dataLabel,
        data: values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Line data={data} options={options} />
  )
}
