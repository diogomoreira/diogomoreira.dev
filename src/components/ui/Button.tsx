import React from "react";

const Button = ({ children }: React.PropsWithChildren) => {
  return (
    <button
      type="button"
      className="inline-block cursor-pointer items-center justify-center rounded-xl bg-black px-5 py-3 font-medium text-slate-200 shadow-md transition-all duration-300 hover:shadow-xl"
    >
      {children}
    </button>
  );
};

export default Button;
