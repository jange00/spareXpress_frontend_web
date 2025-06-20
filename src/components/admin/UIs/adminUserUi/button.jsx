const Button = ({ children, variant = "primary", size = "md", disabled = false, className = "", ...props }) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
    const variants = {
      primary: "bg-[#FFB800] text-black hover:bg-[#FFB800]/90 focus:ring-[#FFB800]",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    }
  
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }
  
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""
  
    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  export default Button