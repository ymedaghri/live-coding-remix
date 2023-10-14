import type { MetaFunction } from "@remix-run/node"
import IconLoopRemix from "~/icons/svg/loopRemix"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  return (
    <div className="p-4">
      <div className="flex h-screen w-full flex-col items-center overflow-y-auto rounded-lg border bg-gray-50 p-4">
        <p className="mt-14 text-sm font-extralight text-gray-900 sm:text-xl md:mb-14 md:text-3xl lg:text-4xl">
          Et si on s'intéressait enfin à l'expérience utilisateur ?
        </p>

        <div id="logoRemixAnimated" className="hidden sm:block">
          <IconLoopRemix className="w-full" />
        </div>
      </div>
    </div>
  )
}
