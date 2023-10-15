import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import AreaChart from "~/components/charts/areaChart"
import MetricChart from "~/routes/accelerate-metrics.$username.$repositoryName/components/metricChart"
import MetricHeader from "~/routes/accelerate-metrics.$username.$repositoryName/components/metricHeader"
import {
  calculateChangeFailureRatePerMonth,
  calculateDeploymentsCountPerMonth,
  fetchDeploymentsCountPerMonth,
} from "./repository"
import BarChart from "~/components/charts/barChart"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const gitHubCommits = await fetchDeploymentsCountPerMonth(
    params.username,
    params.repositoryName,
  )

  const deploymentsCountPerMonth = calculateDeploymentsCountPerMonth(
    gitHubCommits,
    4,
  )
  const changeFailureRateByMonth = calculateChangeFailureRatePerMonth(
    gitHubCommits,
    4,
  )

  return json(
    { deploymentsCountPerMonth, changeFailureRateByMonth },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    },
  )
}

const pageContent = (
  isOnError: boolean,
  deploymentFrequencyLabels?: string[],
  deploymentFrequencyValues?: number[],
  changeFailureRateLabels?: string[],
  changeFailureRateValues?: number[],
) => (
  <div className="grid gap-4 p-4 lg:grid-cols-4">
    <div
      className={`col-span-1 lg:col-span-2 ${
        isOnError ? "bg-red-200" : "bg-white"
      } rounded-lg border p-4 `}
    >
      <MetricHeader name="Deployment Frequency" value="0"></MetricHeader>
      <MetricChart>
        {isOnError && (
          <p className="text-lg text-red-500">
            This project does not respect the commit conventions to display
            these metrics
          </p>
        )}
        {!isOnError && (
          <AreaChart
            labels={deploymentFrequencyLabels!}
            dataLabel="Nombre de déploiements"
            values={deploymentFrequencyValues!}
          />
        )}
      </MetricChart>
    </div>
    <div
      className={`col-span-1 lg:col-span-2 ${
        isOnError ? "bg-red-200" : "bg-white"
      } rounded-lg border p-4 `}
    >
      <MetricHeader name="Change failure rate" value="0"></MetricHeader>
      <MetricChart>
        {isOnError && (
          <p className="text-lg text-red-500">
            This project does not respect the commit conventions to display
            these metrics
          </p>
        )}
        {!isOnError && (
          <BarChart
            labels={changeFailureRateLabels!}
            dataLabel="Nombre de déploiements"
            values={changeFailureRateValues!}
          />
        )}
      </MetricChart>
    </div>
    <div className="col-span-1 rounded-lg border bg-white p-4 lg:col-span-2">
      <MetricHeader name="Lead time for changes" value="0"></MetricHeader>
      <MetricChart>...</MetricChart>
    </div>
    <div className="col-span-1 rounded-lg border bg-white p-4 lg:col-span-2">
      <MetricHeader name="Mean Time to recovery" value="0"></MetricHeader>
      <MetricChart>...</MetricChart>
    </div>
  </div>
)

export default function AccelerateMetricsForRepository() {
  const { deploymentsCountPerMonth, changeFailureRateByMonth } =
    useLoaderData<typeof loader>()

  const deploymentFrequencyLabels = Object.keys(deploymentsCountPerMonth)
  const deploymentFrequencyValues = Object.values(deploymentsCountPerMonth)

  const changeFailureRateLabels = Object.keys(changeFailureRateByMonth)
  const changeFailureRateValues = Object.values(changeFailureRateByMonth)

  return pageContent(
    false,
    deploymentFrequencyLabels,
    deploymentFrequencyValues,
    changeFailureRateLabels,
    changeFailureRateValues,
  )
}

export function ErrorBoundary() {
  return pageContent(true)
}
