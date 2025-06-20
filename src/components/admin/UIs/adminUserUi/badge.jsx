const Badge = ({ color, children, className = "" }) => {
    const colorClasses = {
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      red: "bg-red-100 text-red-800 border-red-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    }
  
    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full border ${
          colorClasses[color] || colorClasses.gray
        } ${className}`}
      >
        {children}
      </span>
    )
  }
  
  export default Badge
  