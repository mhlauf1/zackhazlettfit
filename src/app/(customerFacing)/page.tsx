import Hero from "./_components/home/Hero";
import FeaturedPrograms from "./_components/home/FeaturedPrograms";
import HowItWorks from "./_components/home/HowItWorks";
import Promotion from "./_components/home/Promotion";
import About from "./_components/home/About";
import EmailSignUp from "./_components/home/EmailSignUp";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeaturedPrograms />
      <HowItWorks />
      <Promotion />
      <About />
      <EmailSignUp />
    </main>
  );
}
