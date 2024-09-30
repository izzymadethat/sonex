import React from "react";

const HeaderChip = ({ text }) => {
  return (
    <div className="mx-auto max-w-5xl lg:text-center flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300 cursor-default">
      <h2 className="text-base font-semibold leading-7 text-background bg-primary px-3 rounded-lg uppercase mb-4 lg:mb-8">
        {text}
      </h2>
    </div>
  );
};

export default HeaderChip;
