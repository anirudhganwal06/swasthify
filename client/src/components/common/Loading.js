import React from "react";

const loading = size => {
  return (
    <div className="loadingPage text-center">
      <img width={size} height={size} src="/assets/spinners/pulse.svg" alt="Loading ..." />
    </div>
  );
};

export default loading;
