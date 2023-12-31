import { HeadersFunction, LoaderFunctionArgs, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

export type GitHubRepository = {
  name: string
  description: string
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  for (let i = 0; i <= 500000; i++) {
    console.log("slow process in the backend " + i)
  }

  const response = await fetch(
    `https://api.github.com/users/${params.username}/repos`,
  )

  const gitHubRepositories: GitHubRepository[] = await response.json()

  return json(
    { repositories: gitHubRepositories },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  )
}

export default function GitHubRepositoriesForUser() {
  const { repositories } = useLoaderData<typeof loader>()
  return (
    <div className="p-4">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex justify-between p-3">
          <p className="w-96">Name</p>
          <p className="hidden lg:flex lg:flex-1">Description</p>
          <p className="hidden md:flex md:w-48 md:justify-center">
            Accelerate Metrics
          </p>
        </div>
        <ul>
          {repositories.map((repository, id) => (
            <li key={id}>
              <div className="my-3 flex items-center justify-between rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
                <p className="w-96">{repository.name}</p>
                <p className="hidden lg:flex lg:flex-1">
                  {repository.description}
                </p>
                <p className="hidden md:flex md:w-48 md:justify-center">
                  <Link
                    className="w-20 rounded-lg bg-purple-200 p-1 text-center"
                    to={`/accelerate-metrics/ymedaghri/${repository.name}`}
                  >
                    Show
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
