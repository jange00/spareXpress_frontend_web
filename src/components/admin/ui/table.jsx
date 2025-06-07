// components/ui/table.js
import React from "react";

export const Table = ({ children }) => {
  return <table className="min-w-full table-auto">{children}</table>;
};

export const TableHeader = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

export const TableRow = ({ children }) => {
  return <tr>{children}</tr>;
};

export const TableHead = ({ children }) => {
  return <th className="px-4 py-2 text-left">{children}</th>;
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableCell = ({ children }) => {
  return <td className="px-4 py-2">{children}</td>;
};
