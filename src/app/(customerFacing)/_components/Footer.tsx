import Link from "next/link";
const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = `${currentYear}`;
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="w-full pb-8 pt-12">
      <nav>
        <div className="flex justify-center gap-x-8 items-center">
          <Link
            href="/"
            className="cursor-pointer text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="cursor-pointer text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            Programs
          </Link>
          <Link
            href="/products"
            className="cursor-pointer text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/orders"
            className="cursor-pointer text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            My Orders
          </Link>
        </div>
      </nav>
      <p className="mt-6 text-center text-xs leading-5 text-gray-400 md:px-8">
        &copy; {copyrightDate} {copyrightName}
        {copyrightName.length && !copyrightName.endsWith(".") ? "." : ""} All
        Rights Reserved.
      </p>
      <p className="mt-1 px-8 text-center text-xs leading-5 text-gray-400 md:px-0">
        Powered by Michael Laufersweiler.
      </p>
    </footer>
  );
}
