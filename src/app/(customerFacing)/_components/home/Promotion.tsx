import {
  FaceSmileIcon,
  MapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/20/solid";

export default function Promotion() {
  return (
    <>
      <section className="pb-20 px-6 sm:px-10 md:px-20 pt-16 sm:pt-24 mt-24 lg:py-32">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col flex-1">
              <span
                style={{ letterSpacing: 0.5 }}
                className="mb-1 font-semibold leading-8 tracking-tight text-neutral-900"
              >
                Everything You Need
              </span>
              <h2
                style={{ lineHeight: "120%" }}
                className="mb-4  tracking-tighter text-3xl md:text-4xl font-semibold text-neutral-900 w-10/12 sm:w-4/5 "
              >
                New To Workout Programs? <br />
                <span className="underline text-neutral-700">No Problem.</span>
              </h2>
              <p className="mt-4 md:text-lg leading-7 text-neutral-700  md:w-3/5 ">
                Our straightforward guides in a downloadable format make
                tracking your progress a breeze. Just enter your achievements
                and watch yourself grow.
              </p>
              <div className="flex mt-10 gap-x-4">
                <MapIcon className="h-6 w-6 text-neutral-600" />
                <div>
                  <h3 className="font-semibold text-xl">
                    Visual Progress Tracking
                  </h3>
                  <p className="md:w-3/5 mt-2">
                    See your improvements with clear, visual graphs as you
                    update your achievements.
                  </p>
                </div>
              </div>
              <div className="flex mt-10 gap-x-4">
                <FaceSmileIcon className="h-6 w-6 text-neutral-600" />
                <div>
                  <h3 className="font-semibold text-xl">
                    Supportive Community
                  </h3>
                  <p className="md:w-3/5 mt-2">
                    Join fellow beginners in our community space for tips,
                    motivation, and shared success stories.
                  </p>
                </div>
              </div>
              <div className="flex mt-10 gap-x-4">
                <RocketLaunchIcon className="h-6 w-6 text-neutral-600" />
                <div>
                  <h3 className="font-semibold text-xl">Lifetime Access</h3>
                  <p className="mt-2">
                    When you purchase a program, it&apos;s yours forever.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-1 overflow-hidden pt-16">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <img
                  src="/schedule-img.png"
                  alt="App screenshot"
                  className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-neutral-900/10"
                  width={2432}
                  height={1442}
                />
                <div className="relative" aria-hidden="true">
                  <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
