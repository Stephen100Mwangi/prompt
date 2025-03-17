import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
