export const Card = ({ children, className = "" }) => {
    return <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
  }
  
  export const CardHeader = ({ children, className = "" }) => {
    return <div className={`p-6 ${className}`}>{children}</div>
  }
  
  export const CardTitle = ({ children, className = "" }) => {
    return <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h3>
  }
  
  export const CardDescription = ({ children, className = "" }) => {
    return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
  }
  
  export const CardContent = ({ children, className = "" }) => {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>
  }
  