import React from "react";
import { Rings } from "react-loader-spinner";

const LoadingState: React.FC = () => {
  return (
    <div className="loader-container">
      <Rings
        visible={true}
        height="100"
        width="100"
        color="#9ca3af"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingState;
