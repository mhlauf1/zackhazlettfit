// components/Hero.js
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { getHeroSection, getHeroVideos } from "@/lib/contentful";
import GetAlertButton from "./get-alert-button";
import HeroButton from "./hero-button";
import { Button } from "@/components/ui/button";

export default async function Hero() {
  const heroSection = await getHeroSection();
  const heroVideos = await getHeroVideos();

  if (!heroSection || !heroVideos) {
    return <div>No hero section or videos data available here</div>;
  }

  const videos = heroVideos.videosCollection.items;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 h-[1200px] md:h-screen overflow-hidden">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-neutral-200 md:stroke-neutral-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      {/* Left Column */}
      <div className="flex flex-col justify-start md:justify-between  px-4 pt-12 md:px-12 pb-8 md:pb-20 lg:px-20 mb-10 lg:pt-28">
        <div className="md:mt-0">
          <span className="font-inter rounded-full bg-neutral-100 px-4 py-3 uppercase tracking-wider text-xs font-semibold leading-6 text-neutral-900">
            Personal Training Coming Soon
          </span>
        </div>
        <h1 className="tracking-tighter mt-8 w-full font-semibold capitalize text-gray-900 heroTextSize">
          {heroSection.heading}
        </h1>

        <div className="md:mt-auto flex gap-y-8  flex-col  mt-10 gap-x-6 items-start lg:gap-x-12">
          <p className="text-md md:text-2xl mt-4 md:mt-10 md:leading-8 w-[95%] md:w-[60%]  text-gray-600">
            {heroSection.subHeading}
          </p>
          <button className="bg-neutral-800 md:py-4 md:px-8 rounded-full text-white py-3 px-6 hover:bg-neutral-700 duration-300">
            <HeroButton text={heroSection.actionButtonText} />
          </button>

          {/* When email is ready use get alert button */}
          {/* <GetAlertButton text="Sign up for new program alerts" /> */}
        </div>
      </div>
      {/* Right Column */}
      <div className="relative overflow-hidden h-[100vh]">
        <div className="absolute inset-0 grid grid-cols-2 gap-3 md:gap-4">
          <div className="animate-scroll">
            {videos.slice(0, 4).map((video: any, index: number) => (
              <div key={index} className="relative h-auto  -mt-8 mb-12">
                <video
                  src={video.url}
                  className="w-full rounded-md h-full object-cover"
                  autoPlay
                  loop
                  muted
                />
              </div>
            ))}
          </div>
          <div className="animate-scroll">
            {videos.slice(4, 8).map((video: any, index: number) => (
              <div key={index} className="relative h-auto mb-4">
                <video
                  src={video.url}
                  className="w-full h-full rounded-md object-cover"
                  autoPlay
                  loop
                  muted
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
