"use client";
import { Element } from "react-scroll";
import { FormEvent, useState } from "react";

export default function EmailSignUp() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.status !== 201) {
      setMessage(data.error);
    } else {
      setMessage(data.message);
    }

    setEmail("");
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="relative ">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Element name="getAlertSignUp">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <img
                className="lg:aspect-square h-72 w-full flex-none rounded-2xl object-cover shadow-xl lg:max-w-sm"
                src="./sign-up.jpg"
                alt="Sign Up"
              />
              <div className="w-full flex-auto">
                <h2 className="font-inter text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  New Programs Coming Soon
                </h2>
                <p className="mt-4 md:text-lg leading-7 text-gray-300">
                  Our upcoming expert-led fitness and nutrition programs are
                  designed to help you achieve your health goals with
                  personalized guidance, structured workout plans, and tailored
                  nutrition advice.
                </p>
                <div className="mt-10 md:mt-6">
                  {/* <form
                    className="mt-6 sm:flex sm:max-w-md"
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      required
                      className="tex-sm font-inter w-full rounded-md px-6 py-3"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm duration-300 hover:bg-neutral-700 border-2 border-neutral-900 hover:border-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form> */}
                  {message && (
                    <p className="mt-4 text-sm text-gray-300">{message}</p>
                  )}
                </div>
              </div>
            </div>
          </Element>
        </div>
        <div
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4686e5] opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
