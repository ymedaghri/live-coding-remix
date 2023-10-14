import { Link } from "@remix-run/react"
import IconDiamond from "~/icons/svg/diamond"
import RoundedIconDashboard from "~/icons/rounded/roundedDashBoard"
import RoundedIconPerson from "~/icons/rounded/roundedPerson"
import RoundedIconSettings from "~/icons/rounded/roundedSettings"
import RoundedIconGitHub from "~/icons/rounded/roundedGitHub"

export default function Sidebar({ children }: any) {
  return (
    <>
      <div className="flex">
        <div className="fixed flex h-screen w-20 flex-col justify-between border-r-[1px] bg-white p-4">
          <div className="flex flex-col items-center">
            <Link to="/">
              <div className="inline-block rounded-lg bg-purple-800 p-3 text-white">
                <IconDiamond />
              </div>
            </Link>
            <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
            <Link to="/">
              <RoundedIconDashboard />
            </Link>
            <Link to="/customers">
              <RoundedIconPerson />
            </Link>
            <Link to="/settings">
              <RoundedIconSettings />
            </Link>
            <Link to="/github-repositories/ymedaghri">
              <RoundedIconGitHub />
            </Link>
          </div>
        </div>
      </div>
      <main className="ml-20 justify-between">{children}</main>
    </>
  )
}
