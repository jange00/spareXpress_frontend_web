import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import FormInput from "./formInput"

const PasswordInput = ({ id, label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <FormInput id={id} type={showPassword ? "text" : "password"} label={label} value={value} onChange={onChange} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-300"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  )
}

export default PasswordInput
