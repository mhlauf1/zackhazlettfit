// components/HowItWorks.js
import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="bg-neutral-800 pb-20 px-6 sm:px-10 md:px-20 pt-16 sm:pt-24 mt-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-20">
          <div className="flex-1 flex flex-col mt-12">
            <div className="flex flex-col">
              <p
                style={{ letterSpacing: 0.5 }}
                className="text-lg font-semibold leading-8 tracking-tight text-slate-100"
              >
                Start Today
              </p>
              <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-200">
                <span className="text-white font-semibold">4 Easy Steps</span>{" "}
                To Start Your Health and Fitness Journey
              </h3>
            </div>
            <div className="mt-6 md:mt-12 space-y-8">
              <Step
                title="Browse Programs"
                number="01"
                description="Whether you're looking to shed pounds, build muscle, or enhance endurance, you'll find a program that aligns with your personal health ambitions."
              />
              <Step
                title="Make Your Purchase"
                number="02"
                description="Once you've found your ideal program, secure your copy with our secure purchasing process."
              />
              <Step
                title="Download Your Program"
                number="03"
                description="Immediately after purchase, your program becomes available for download."
              />
              <Step
                title="Get To Work"
                number="04"
                description="This digital format ensures that you can start your fitness journey right away and revisit the program whenever you need."
              />
            </div>
          </div>
          <div className="flex-1 mt-8 lg:mt-0">
            <Image
              src="/zh-asset.webp"
              alt="Zack Hazlett Fitness"
              width={700}
              height={800}
              layout="responsive"
              objectFit="cover"
              className="w-full rounded-md object-cover ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type StepProps = {
  number: string;
  title: string;
  description: string;
};

function Step({ number, title, description }: StepProps) {
  return (
    <div className="text-white flex flex-col mt-12 lg:mt-0 lg:flex-row lg:items-start lg:space-x-4">
      <div>
        <p className="text-2xl font-semibold">{title}</p>
        <p className="mt-2 md:w-[80%] text-white/70">{description}</p>
      </div>
    </div>
  );
}
