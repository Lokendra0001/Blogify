import React from "react";

export default function Button({
  name,
  children = "Button",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold ${className} cursor-pointer`}
      type={type}
      {...props}
    >
      {name ? name : children}
    </button>
  );
}
