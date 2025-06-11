// components/ui/card.js
import React from "react";

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="border-b pb-4 mb-4">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const CardDescription = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};
