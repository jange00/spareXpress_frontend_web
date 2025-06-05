import { ChevronDown, ChevronUp, Star } from "lucide-react"

export function FilterSection({
  title,
  filterKey,
  options,
  selectedFilters,
  onFilterChange,
  expanded,
  onToggle,
  type = "checkbox",
  showStars = false,
}) {
  const isSelected = (value) => {
    const filterValue = selectedFilters[filterKey]
    if (Array.isArray(filterValue)) {
      return filterValue.includes(value)
    }
    return filterValue === value
  }

  return (
    <div className="mb-6 border-b pb-6">
      <div className="flex justify-between items-center cursor-pointer mb-4" onClick={onToggle}>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {expanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type={type}
                name={type === "radio" ? filterKey : undefined}
                value={option.id}
                checked={isSelected(option.id)}
                onChange={() => onFilterChange(filterKey, option.id)}
                className={`${
                  type === "checkbox" ? "rounded" : ""
                } border-gray-300 text-yellow-500 focus:ring-yellow-500`}
              />
              <span className="text-gray-700 flex items-center">
                {option.label}
                {showStars && (
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Number(option.id) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </span>
              {option.count && <span className="text-gray-500 text-sm">({option.count})</span>}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
