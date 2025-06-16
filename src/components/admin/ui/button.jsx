// components/ui/button.js
import React from "react";

export const Button = ({ children, variant = "default", size = "md", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md focus:outline-none";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-200",
  };
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
