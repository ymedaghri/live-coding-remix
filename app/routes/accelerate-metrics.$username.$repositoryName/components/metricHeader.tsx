export default function MetricHeader(props: any) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col pb-4">
        <p className="text-lg font-bold">{props.name}</p>
      </div>
      <p className="flex items-center justify-center rounded-lg bg-green-200 p-2">
        <span className="text-lg text-green-700">+{props.value}%</span>
      </p>
    </div>
  )
}
