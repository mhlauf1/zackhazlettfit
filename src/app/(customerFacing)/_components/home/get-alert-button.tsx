'use client';
import { Link } from 'react-scroll';

type Props = {
  text: string;
};

const GetAlertButton = ({ text }: Props) => {
  return (
    <Link smooth={true} duration={500} to="getAlertSignUp">
      <div className="font-inter w-auto cursor-pointer  border-b border-white px-4 py-2 duration-300 hover:border-b hover:border-gray-200">
        {text}{' '}
        <span className="ml-2" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
};

export default GetAlertButton;
