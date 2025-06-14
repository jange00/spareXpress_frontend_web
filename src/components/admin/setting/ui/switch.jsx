import { Label } from "./label"

export const Switch = ({ id, checked, onChange, label, description, className = "" }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="space-y-0.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2 ${
          checked ? "bg-[#FFB800]" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}