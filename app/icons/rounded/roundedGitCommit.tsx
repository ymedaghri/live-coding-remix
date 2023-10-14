import IconGitCommit from "../svg/git-commit"

export default function RoundedIconGitCommit(props: any) {
  console.log(props)
  return (
    <div
      className={"inline-block cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200"
        .concat(" ")
        .concat(props.className || "")}
    >
      <IconGitCommit />
    </div>
  )
}
