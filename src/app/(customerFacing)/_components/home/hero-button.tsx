"use client";
import { Link } from "react-scroll";

type Props = {
  text: string;
};

const HeroButton = ({ text }: Props) => {
  return (
    <Link offset={-100} smooth={true} duration={500} to="featuredProgram">
      <div>{text}</div>
    </Link>
  );
};

export default HeroButton;
