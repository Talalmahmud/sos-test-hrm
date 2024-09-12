import React from "react";
import "./loader.css";
const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-orange rounded-full animate-pulse animation-delay-200"></div>
        <div className="w-4 h-4 bg-orange rounded-full animate-pulse animation-delay-400"></div>
        <div className="w-4 h-4 bg-orange rounded-full animate-pulse animation-delay-500"></div>{" "}
      </div>
    </div>
  );
};

export default PageLoader;
