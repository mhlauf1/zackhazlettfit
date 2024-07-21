import { FaRunning } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { VscGitPullRequestCreate } from "react-icons/vsc";

type Props = {};
const features = [
  {
    name: "Professional Fitness Coach",
    description:
      "Zack offers more than fitness training; he delivers a transformative fitness philosophy for life-long health.",
    icon: IoIosFitness,
  },
  {
    name: "Former Division 1 Athlete",
    description:
      "As a Miami, OH football alumnus, Zack translates collegiate athletic discipline into your workout routine.",
    icon: FaRunning,
  },
  {
    name: "Nutrition Advice",
    description:
      "Get customized nutrition strategies that complement your fitness journey and cater to your palate.",
    icon: GiFruitBowl,
  },
  {
    name: "Program Creator",
    description:
      "Expect uniquely crafted fitness plans from Zack, designed to challenge, inspire, and achieve results.",
    icon: VscGitPullRequestCreate,
  },
];

const Info = (props: Props) => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="mx-auto flex flex-col items-center lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-neutral-600">
            Train and Recover with Purpose
          </h2>
          <p className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Zack
          </p>
          <p className="mt-4 text-center text-md leading-7 md:leading-8 text-gray-600 md:w-4/5 md:text-lg">
            Reversed Autoimmune Disease. Zack is extremely passionate about
            nutrition after dealing with ulcerative colitis for 5 years before
            reversing it. Having a strong focus on whole foods from sustainable
            and healthy sources has transformed his quality of life, and he
            wants to help others do the same.
          </p>
        </div>
        <div className="mx-auto mt-16  sm:mt-20 lg:mt-24 ">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Info;
