export const Tabs = ({ value, onChange, children, className = "" }) => {
  return <div className={`w-full ${className}`}>{children}</div>
}

export const TabsList = ({ children, className = "" }) => {
  return <div className={`flex border-b border-gray-200 ${className}`}>{children}</div>
}

export const TabsTrigger = ({ value, activeValue, onClick, children, className = "" }) => {
  const isActive = value === activeValue
  return (
    <button
      className={`px-4 py-2 font-medium text-sm ${
        isActive ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"
      } ${className}`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, activeValue, children, className = "" }) => {
  if (value !== activeValue) return null
  return <div className={`py-4 ${className}`}>{children}</div>
}
