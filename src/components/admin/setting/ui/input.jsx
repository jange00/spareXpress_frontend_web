import { Label } from "./label"

export const Input = ({ label, id, type = "text", placeholder, value, onChange, icon, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 ${icon ? "pl-10" : ""} border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}
