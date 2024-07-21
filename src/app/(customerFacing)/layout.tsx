import Footer from "./_components/Footer";
export const dynamic = "force-dynamic";
import { NavLink, Nav } from "./_components/Nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Nav>
        <NavLink href="/products">Programs</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
