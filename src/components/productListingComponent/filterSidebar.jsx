import { useState } from "react"
import { FilterSection } from "./filterSection"
import { ChevronUp, ChevronDown } from "lucide-react"

export function FilterSidebar({ selectedFilters, onFilterChange, onClearFilters }) {
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    availability: true,
  })

  const toggleFilter = (filter) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  const categories = [
    { id: "vehicle-parts", label: "Vehicle Parts", count: 45 },
    { id: "computer-parts", label: "Computer Parts", count: 38 },
  ]

  const subcategories = {
    "vehicle-parts": [
      { id: "engine-parts", label: "Engine Parts", count: 15 },
      { id: "brakes", label: "Brake Systems", count: 18 },
      { id: "transmission", label: "Transmission", count: 12 },
      { id: "suspension", label: "Suspension", count: 10 },
      { id: "electrical", label: "Electrical", count: 14 },
      { id: "fuel-system", label: "Fuel System", count: 8 },
    ],
    "computer-parts": [
      { id: "processors", label: "Processors", count: 20 },
      { id: "storage", label: "Storage", count: 15 },
      { id: "gpus", label: "Graphics Cards", count: 18 },
      { id: "memory", label: "Memory", count: 12 },
      { id: "cooling", label: "Cooling", count: 10 },
      { id: "power-supply", label: "Power Supply", count: 8 },
    ],
  }

  const brands = [
    { id: "Intel", label: "Intel", count: 24 },
    { id: "AMD", label: "AMD", count: 12 },
    { id: "NVIDIA", label: "NVIDIA", count: 18 },
    { id: "Corsair", label: "Corsair", count: 15 },
    { id: "ASUS", label: "ASUS", count: 20 },
    { id: "MSI", label: "MSI", count: 16 },
    { id: "Toyota", label: "Toyota", count: 30 },
    { id: "Honda", label: "Honda", count: 25 },
    { id: "Ford", label: "Ford", count: 22 },
    { id: "BMW", label: "BMW", count: 18 },
    { id: "Bosch", label: "Bosch", count: 20 },
    { id: "Brembo", label: "Brembo", count: 15 },
  ]

  const priceRanges = [
    { id: "0-100", label: "Under $100" },
    { id: "100-300", label: "$100 - $300" },
    { id: "300-500", label: "$300 - $500" },
    { id: "500-plus", label: "$500+" },
  ]

  const ratings = [
    { id: "4", label: "4★ & above" },
    { id: "3", label: "3★ & above" },
  ]

  const availability = [{ id: "In Stock", label: "In Stock" }]

  return (
    <div className="w-64">
      <div className="bg-white rounded-lg shadow p-6 sticky top-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={onClearFilters} className="text-sm text-yellow-500 hover:text-yellow-600">
            Clear All
          </button>
        </div>

        {/* Category Filter with Subcategories */}
        <div className="mb-6 border-b pb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleFilter("category")}
          >
            <h3 className="font-semibold text-gray-900">Category</h3>
            {expandedFilters.category ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>

          {expandedFilters.category && (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.categories.includes(cat.id)}
                      onChange={() => onFilterChange("categories", cat.id)}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-gray-700">{cat.label}</span>
                    <span className="text-gray-500 text-sm">({cat.count})</span>
                  </label>

                  {/* Show subcategories if category is selected */}
                  {selectedFilters.categories.includes(cat.id) && subcategories[cat.id] && (
                    <div className="ml-6 mt-2 space-y-2">
                      {subcategories[cat.id].map((sub) => (
                        <label key={sub.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.subcategories.includes(sub.id)}
                            onChange={() => onFilterChange("subcategories", sub.id)}
                            className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="text-gray-700">{sub.label}</span>
                          <span className="text-gray-500 text-sm">({sub.count})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <FilterSection
          title="Brand"
          filterKey="brands"
          options={brands}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          expanded={expandedFilters.brand}
          onToggle={() => toggleFilter("brand")}
        />

        <FilterSection
          title="Price Range"
          filterKey="priceRange"
          options={priceRanges}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          expanded={expandedFilters.price}
          onToggle={() => toggleFilter("price")}
          type="radio"
        />

        <FilterSection
          title="Rating"
          filterKey="rating"
          options={ratings}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          expanded={expandedFilters.rating}
          onToggle={() => toggleFilter("rating")}
          type="radio"
          showStars
        />

        <FilterSection
          title="Availability"
          filterKey="availability"
          options={availability}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          expanded={expandedFilters.availability}
          onToggle={() => toggleFilter("availability")}
        />
      </div>
    </div>
  )
}
