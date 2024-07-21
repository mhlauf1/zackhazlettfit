"use client";
import { Element } from "react-scroll";

export default function AvailableProgramsHeader() {
  return (
    <Element name="featuredProgram">
      <div className="flex items-center mb-20 flex-col">
        <h2
          style={{ letterSpacing: 0.5 }}
          className="mb-3 font-semibold leading-8 tracking-tight text-neutral-900"
        >
          Available Programs
        </h2>
        <p
          style={{ lineHeight: "120%" }}
          className="md:mb-4 tracking-tighter text-3xl md:text-4xl font-semibold text-neutral-900 w-10/12 md:w-4/5 text-center"
        >
          Check out our top fitness programs, <br />
          <span className="text-neutral-600">
            tailored to kickstart your journey.
          </span>
        </p>
      </div>
    </Element>
  );
}
