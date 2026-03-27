import React from "react";

const Button = ({ children }: React.PropsWithChildren) => {
  return (
    <button type="button" className="btn">
      {children}
    </button>
  );
};

export default Button;
