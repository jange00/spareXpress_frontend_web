import { Mail, Phone } from "lucide-react"

export const LoginMethodSelector = ({ loginMethod, onMethodChange }) => {
  return (
    <div className="flex rounded-full bg-gray-100 p-1 mb-6 shadow-inner">
      {["email", "phone"].map((method) => (
        <button
          key={method}
          className={`flex-1 flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            loginMethod === method ? "bg-yellow-500 text-black shadow-lg" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onMethodChange(method)}
        >
          {method === "email" ? <Mail className="w-5 h-5 mr-2" /> : <Phone className="w-5 h-5 mr-2" />}
          {method.charAt(0).toUpperCase() + method.slice(1)}
        </button>
      ))}
    </div>
  )
}
