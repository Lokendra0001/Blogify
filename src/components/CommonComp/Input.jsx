import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label = "Input", className = "", type = "text", ...props }, ref) => {
    return (
      <>
        {label && (
          <label className="text-gray-400 font-semibold text-[15px] ml-2">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          autoComplete="off"
          className={`${className} w-full p-1 outline-none rounded-md border-[1px] border-gray-200`}
        />
      </>
    );
  }
);

export default Input;
