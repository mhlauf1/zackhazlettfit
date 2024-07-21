"use client";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useState } from "react";

export default function SalesFunnelCard() {
  const monthTotal = 25;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ borderRadius: 30 }}
      className="px-6 py-4 flex flex-col justify-between bg-neutral-100 text-neutral-800 hover:cursor-pointer hover:text-neutral-100 duration-300 hover:bg-neutral-900 rounded-xl h-[45vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between py-3 items-center">
        <h2 className="text-xl tracking-tight">Sales Funnel</h2>
      </div>
      <div>
        <p className="text-2xl font-semibold">0 Customers</p>2 New this Month
        <p></p>
      </div>
    </div>
  );
}
