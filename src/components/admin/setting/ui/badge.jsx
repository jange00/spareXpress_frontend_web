export const Badge = ({ children, variant = "default", className = "" }) => {
    const variantStyles = {
      default: "bg-gray-100 text-gray-800",
      primary: "bg-[#FFB800] text-black",
      success: "bg-green-100 text-green-800",
      danger: "bg-red-100 text-red-800",
      warning: "bg-amber-100 text-amber-800",
      outline: "bg-transparent border border-gray-200 text-gray-800",
    }
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
      >
        {children}
      </span>
    )
  }
  