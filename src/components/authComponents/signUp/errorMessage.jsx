import { AlertCircle } from "lucide-react"

const ErrorMessage = ({ error }) => {
  if (!error) return null

  return (
    <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center">
      <AlertCircle className="w-5 h-5 mr-2" />
      {error}
    </div>
  )
}

export default ErrorMessage
