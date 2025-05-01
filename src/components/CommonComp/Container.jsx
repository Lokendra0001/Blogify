import React from "react";

export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-[1400px] mx-auto overflow-visible ${className}`}>
      {children}
    </div>
  );
}
