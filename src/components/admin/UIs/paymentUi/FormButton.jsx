import { Loader2 } from "lucide-react"

export default function FormButton({
  type = "button",
  children,
  isLoading = false,
  loadingText = "Loading...",
  disabled = false,
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {isLoading ? loadingText : children}
    </button>
  )
}
