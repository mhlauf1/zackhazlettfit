"use client";
import AboutHero from "../_components/about/AboutHero";
import Info from "../_components/about/Info";

export const runtime = "edge";

const About = () => {
  return (
    <section>
      <AboutHero />
      <Info />
    </section>
  );
};

export default About;
