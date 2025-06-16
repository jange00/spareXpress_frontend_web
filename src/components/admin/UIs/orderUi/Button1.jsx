export const Button = ({ variant = "primary", size = "md", children, className = "", ...props }) => {
    const baseClasses =
      "inline-flex items-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
    const variantClasses = {
      primary: "bg-[#FFB800] text-black hover:bg-[#FFB800]/90 focus:ring-[#FFB800]",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-[#FFB800]",
    }
  
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }
  
    return (
      <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
        {children}
      </button>
    )
  }