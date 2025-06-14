import { Label } from "./label"

export const Checkbox = ({ id, checked, onChange, label, className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-[#FFB800] focus:ring-[#FFB800]"
      />
      {label && (
        <Label htmlFor={id} className="font-normal">
          {label}
        </Label>
      )}
    </div>
  )
}
