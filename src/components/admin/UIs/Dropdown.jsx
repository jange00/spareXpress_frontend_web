import { useState, useRef, useEffect } from "react"
import { ChevronDownIcon } from "../icons/Icons"

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  className = "",
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full px-4 py-2.5 text-left bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer hover:border-gray-400"}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">No options available</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 ${
                  value === option.value ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-900"
                } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value)
                    setIsOpen(false)
                  }
                }}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown
