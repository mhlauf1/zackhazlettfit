"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <header className="px-6 md:px-12 lg:px-20 sticky top-0 z-30 bg-white shadow	w-full flex justify-between items-center mx-auto h-16">
      <div>
        {/* <span>Add SSR thing</span> */}
        <Link href="/" className="text-sm uppercase font-bold tracking-wider	">
          Zack Hazlett Fitness
        </Link>
      </div>
      <nav className="hidden md:block">{children}</nav>
    </header>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground rounded-ml duration-300 focus-visible:bg-secondary text-sm focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
