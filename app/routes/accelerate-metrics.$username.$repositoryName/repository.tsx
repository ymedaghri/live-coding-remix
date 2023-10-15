export type GitHubCommit = {
  commit: {
    committer: {
      name: string
      date: string
    }
    message: string
  }
}

const monthsInFrench = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

export const fetchDeploymentsCountPerMonth = async (
  username?: string,
  repositoryName?: string,
) => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repositoryName}/commits?per_page=100`,
  )
  const gitHubCommits: GitHubCommit[] = await response.json()

  return gitHubCommits
}

export const calculateDeploymentsCountPerMonth = (
  gitHubCommits: GitHubCommit[],
  numberOfmonths: number,
) => {
  const deploymentCountByMonth: Record<string, number> = {}
  const currentDate = new Date()

  const commits = gitHubCommits
    .filter(({ commit }) =>
      /rc-\d+\.\d+\.\d+ deployed to production/.test(commit.message),
    )
    .map(({ commit }) => ({
      message: commit.message,
      date: commit.committer.date,
    }))

  for (let i = numberOfmonths - 1; i >= 0; i--) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() - i

    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0, 23, 59, 59)

    const deployments = commits.filter((commit) => {
      const deployDate = new Date(commit.date)
      return deployDate >= startDate && deployDate <= endDate
    }).length

    deploymentCountByMonth[`${monthsInFrench[month]}`] = deployments
  }

  return deploymentCountByMonth
}

export const calculateChangeFailureRatePerMonth = (
  gitHubCommits: GitHubCommit[],
  numberOfmonths: number,
) => {
  const changeFailureRateByMonth: Record<string, number> = {}
  const currentDate = new Date()

  for (let i = numberOfmonths - 1; i >= 0; i--) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() - i

    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0, 23, 59, 59)

    const commits = gitHubCommits.filter(({ commit }) => {
      const deployDate = new Date(commit.committer.date)
      return deployDate >= startDate && deployDate <= endDate
    })

    let failedDeployments = 0
    let totalDeployments = 0
    let isPreviousCommitAHotFix = false

    commits.forEach(({ commit }) => {
      const isDeployment = commit.message.startsWith("rc-")

      if (isDeployment) {
        totalDeployments++
        if (isPreviousCommitAHotFix) {
          failedDeployments++
        }
      }

      isPreviousCommitAHotFix = commit.message.startsWith("BUGFIX")
    })

    changeFailureRateByMonth[`${monthsInFrench[month]}`] =
      (failedDeployments / totalDeployments) * 100
  }

  return changeFailureRateByMonth
}
