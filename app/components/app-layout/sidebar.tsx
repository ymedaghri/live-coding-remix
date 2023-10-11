import { Link } from "@remix-run/react";
import IconDiamond from "~/icons/svg/diamond";
import RoundedIconDashboard from "~/icons/rounded/roundedDashBoard";
import RoundedIconPerson from "~/icons/rounded/roundedPerson";
import RoundedIconSettings from "~/icons/rounded/roundedSettings";
import RoundedIconGitHub from "~/icons/rounded/roundedGitHub";

export default function Sidebar({ children }: any) {
  return (
    <>
      <div className="flex">
        <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <Link to="/">
              <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                <IconDiamond />
              </div>
            </Link>
            <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
            <Link to="/">
              <RoundedIconDashboard />
            </Link>
            <Link to="/customers">
              <RoundedIconPerson />
            </Link>
            <Link to="/settings">
              <RoundedIconSettings />
            </Link>
            <Link to="/github-repositories">
              <RoundedIconGitHub />
            </Link>
          </div>
        </div>
      </div>
      <main className="ml-20 justify-between">{children}</main>
    </>
  );
}
