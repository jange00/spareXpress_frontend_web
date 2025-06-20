const Select = ({
    label,
    error,
    options = [],
    placeholder = "Select an option",
    className = "",
    required = false,
    ...props
  }) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800] ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
          } ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }
  
  export default Select