import { Nav, NavLink } from "@/app/(customerFacing)/_components/Nav";
import TopBar from "./_components/TopBar";
import SideBar from "./_components/SideBar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 px-8 py-6">
        {/* <TopBar /> */}
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}
