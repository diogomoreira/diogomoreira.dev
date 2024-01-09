import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <h1 className="text-xl p-6 md:p-0 flex gap-x-2 items-center tracking-tight font-bold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
      <Link href={"/"}>
        <div>
          <span className="font-medium">diogo</span>
          <span className="font-light">dmoreira</span>
          <span className="font-medium">.com</span>
        </div>
      </Link>
    </h1>
  );
};

export default Logo;
