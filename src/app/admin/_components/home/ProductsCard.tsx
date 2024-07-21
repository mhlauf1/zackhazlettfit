"use client";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useState } from "react";

export default function ProductCard({ productData }: any) {
  const monthTotal = 25;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ borderRadius: 30 }}
      className="px-6 py-4 flex flex-col justify-between bg-neutral-100 text-neutral-800 hover:cursor-pointer hover:text-neutral-100 duration-300 hover:bg-neutral-900 rounded-xl h-[25vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl tracking-tight">My Products</h2>
        <div className="bg-white p-3 rounded-full  duration-500">
          <MdOutlineArrowOutward
            color="#232323"
            className={` ${isHovered ? "rotate-45" : "rotate-0"} duration-500`}
          />
        </div>
      </div>
      <div className="relative">
        <p
          className={`text-2xl font-semibold transition-all duration-300 ${
            isHovered ? "text-white" : "text-neutral-800"
          }`}
        >
          {productData.activeCount} Active
        </p>
        <p
          className={`transition-all duration-300 ${
            isHovered ? "text-white" : "text-neutral-800"
          }`}
        >
          Back to Basics Trending Now
        </p>
        <p
          className={`absolute font-medium bottom-0 right-0 transform transition-all duration-700 ${
            isHovered
              ? "translate-y-0 opacity-100 text-white"
              : "translate-y-[20px] opacity-0"
          }`}
        >
          View all Products
        </p>
      </div>
    </div>
  );
}
