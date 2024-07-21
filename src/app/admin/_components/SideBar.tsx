"use client";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { TiDocument } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function SideBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) =>
    `flex items-center gap-x-3 py-3 px-4 rounded-xl duration-300 ${
      isActive(path)
        ? "bg-neutral-200 text-neutral-900"
        : "text-neutral-500 hover:text-neutral-900"
    }`;

  return (
    <div className="sticky hidden md:flex justify-between py-8 h-full min-h-screen w-auto  bg-neutral-50 border-r flex-col items-center">
      <div className="flex px-4 flex-col">
        <h2 className="text-center text-neutral-700">ZHF</h2>
        <div className="h-[1px] mt-4 bg-neutral-200" />
        <div className="space-y-2 mt-4">
          <Link className={linkClasses("/admin")} href="/admin">
            <MdOutlineDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            className={linkClasses("/admin/products")}
            href="/admin/products"
          >
            <TiDocument size={20} />
            <span>Programs</span>
          </Link>
          <Link className={linkClasses("/admin/users")} href="/admin/users">
            <FiUsers size={20} />
            <span>Customer</span>
          </Link>
          <Link className={linkClasses("/admin/orders")} href="/admin/orders">
            <BsBank size={20} />
            <span>Sales</span>
          </Link>
        </div>
      </div>
    </div>
    // TODO: Add mobile hamburger menu for this sidebar
  );
}
