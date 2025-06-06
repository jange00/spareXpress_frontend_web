import { CheckCircle, XCircle } from "lucide-react"

const PasswordStrength = ({ password, passwordStrength, requirements }) => {
  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            passwordStrength < 40 ? "bg-red-500" : passwordStrength < 80 ? "bg-yellow-500" : "bg-green-500"
          }`}
          style={{ width: `${passwordStrength}%` }}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center text-sm">
            {req.regex.test(password) ? (
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className="text-gray-600">{req.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordStrength
