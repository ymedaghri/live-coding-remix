export default function Header() {
  return (
    <div className="flex justify-between px-4 pt-4 ">
      <h2 className="text-3xl font-thin text-gray-900">
        Accelerate Metrics Live Coding
      </h2>
      <h2 className="hidden rounded-full bg-purple-500 px-2 py-1 text-xl font-thin text-white md:block">
        {new Date().toLocaleDateString("fr-FR")}
      </h2>
    </div>
  )
}
