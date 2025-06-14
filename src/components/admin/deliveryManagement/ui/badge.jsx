const Badge = ({ color, children }) => {
    const colorClasses = {
      yellow: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      blue: "bg-blue-100 text-blue-800 border border-blue-200",
      green: "bg-green-100 text-green-800 border border-green-200",
      red: "bg-red-100 text-red-800 border border-red-200",
      gray: "bg-gray-100 text-gray-800 border border-gray-200",
    }
  
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[color] || colorClasses.gray}`}
      >
        {children}
      </span>
    )
  }
  
  export default Badge
  