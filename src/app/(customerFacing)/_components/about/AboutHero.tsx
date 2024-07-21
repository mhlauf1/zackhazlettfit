"use client";
import ReactPlayer from "react-player";

type Props = {};

const AboutHero = (props: Props) => {
  return (
    <div className=" relative bg-white">
      <div className="relative isolate">
        <svg
          className="absolute inset-0 -z-10 hidden h-full w-full stroke-gray-300 [mask-image:radial-gradient(100%_100%_at_bottom_right,white,transparent)] md:block"
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
        <div className="relative flex h-auto lg:px-20 px-6 flex-col gap-y-16 pb-10 md:pb-24 pt-4 md:pt-28 md:flex-row md:items-center md:py-24">
          <div className="flex w-full justify-between  flex-col items-start md:w-7/12 ">
            <div className="flex  mt-12 flex-col items-start">
              <span className="font-inter bg-neutral-100 rounded-full px-4 py-3  uppercase tracking-wider text-xs font-semibold leading-6 text-neutral-800">
                Fitness & Health Professional
              </span>
              <h1 className="mb-4 mt-10 w-full text-3xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 md:text-5xl lg:text-6xl">
                Unlock Your Full Potential with Zack Hazlett Fitness
              </h1>
              <div className="flex flex-col md:w-7/12">
                <p className="mt-2 text-md md:text-lg  text-neutral-700">
                  Dedicated to transforming lives through personalized fitness
                  and nutrition programs. Here, we believe in fitness as a
                  lifestyle, not a quick fix.
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-5/12">
            <div className="flex mb-16 md:mb-0 w-full items-start rounded-xl">
              <ReactPlayer
                playing
                loop
                playsinline
                height="70vh"
                style={{ display: "flex", flex: "1" }}
                muted
                url="./hazlett-main-video.mp4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
