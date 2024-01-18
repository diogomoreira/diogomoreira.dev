import React from "react";
import { RiTranslate2 } from "react-icons/ri";

const LanguageToggle = () => {
  return (
    <button
      aria-label="Toggle Language"
      className="rounded-md text-slate-700 dark:text-slate-200 text-xl flex items-center"
    >
      <RiTranslate2 />
    </button>
  );
};

export default LanguageToggle;
