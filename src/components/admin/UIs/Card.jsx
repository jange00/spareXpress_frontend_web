const Card = ({ children, className = "", padding = "p-6" }) => {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${padding} ${className}`}>{children}</div>
    )
  }
  
  const CardHeader = ({ children, className = "" }) => {
    return <div className={`mb-4 ${className}`}>{children}</div>
  }
  
  const CardTitle = ({ children, className = "" }) => {
    return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
  }
  
  const CardContent = ({ children, className = "" }) => {
    return <div className={className}>{children}</div>
  }
  
  export { Card, CardHeader, CardTitle, CardContent }
  