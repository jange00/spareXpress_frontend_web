import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"

export function SortIcon({ field, currentField, direction }) {
  if (field !== currentField) {
    return <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
  }

  return direction === "asc" ? (
    <ChevronUp className="w-4 h-4 ml-1 text-gray-700" />
  ) : (
    <ChevronDown className="w-4 h-4 ml-1 text-gray-700" />
  )
}
