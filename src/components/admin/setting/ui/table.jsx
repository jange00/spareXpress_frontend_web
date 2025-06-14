export const Table = ({ children, className = "" }) => {
    return (
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>
      </div>
    )
  }
  
  export const TableHeader = ({ children, className = "" }) => {
    return <thead className={`bg-gray-50 ${className}`}>{children}</thead>
  }
  
  export const TableBody = ({ children, className = "" }) => {
    return <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
  }
  
  export const TableRow = ({ children, className = "" }) => {
    return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>
  }
  
  export const TableHead = ({ children, className = "" }) => {
    return (
      <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
        {children}
      </th>
    )
  }
  
  export const TableCell = ({ children, className = "" }) => {
    return <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
  }
  