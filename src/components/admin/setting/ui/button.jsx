export const Button = ({ children, onClick, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors"

  const variantStyles = {
    default: "bg-[#FFB800] text-black hover:bg-[#e6a700]",
    outline: "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    default: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
