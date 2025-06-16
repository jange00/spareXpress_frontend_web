import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export const PasswordInput = ({ id, label, placeholder, value, onChange, required = false }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          className="block w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-transparent transition"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}