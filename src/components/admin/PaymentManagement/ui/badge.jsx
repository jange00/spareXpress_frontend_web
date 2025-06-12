export const Badge = ({ color, children }) => {
    const colorClasses = {
      yellow: "bg-yellow-500 text-black",
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      red: "bg-red-500 text-white",
      gray: "bg-gray-500 text-white",
    }
  
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[color] || colorClasses.gray}`}
      >
        {children}
      </span>
    )
  }
  