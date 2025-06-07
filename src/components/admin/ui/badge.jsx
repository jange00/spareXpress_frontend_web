// components/ui/badge.js
import React from "react";

export const Badge = ({ children, className, ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
