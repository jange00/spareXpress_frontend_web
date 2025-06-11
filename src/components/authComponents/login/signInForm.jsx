import { useState } from "react"
import { Link } from "react-router-dom"
import { LogIn, ArrowRight } from "lucide-react"
import { FormInput } from "./formInput"
import { PasswordInput } from "./passwordInput"
import { SocialLogin } from "./socialLogin"

export const SignInForm = ({ loginMethod, onSubmit }) => {
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    identifier:  "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    let value = e.target.value

    if (loginMethod === "phone") {
      if (!value.startsWith("+977 ")) {
        value = "+977 "
      }
      const digitsOnly = value.replace(/\D/g, "").slice(3, 13)
      value = `+977 ${digitsOnly}`
    }

    setFormData({ ...formData, identifier: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.identifier || !formData.password) {
      setError("Please fill in all fields.")
      return
    }
    setError("")
    onSubmit(formData)
  }

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login successful", response)
    // Send response to backend for further auth
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-sm text-center animate-bounce">{error}</p>}

      {/* Email/Phone Input */}
      <FormInput
        id="identifier"
        type={loginMethod === "email" ? "email" : "tel"}
        label={loginMethod === "email" ? "Email Address" : "Phone Number"}
        placeholder={loginMethod === "email" ? "Enter your email" : "+977 XXXXXXXX"}
        value={formData.identifier}
        onChange={handleInputChange}
        required
      />

      {/* Password Input */}
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="mr-2 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-yellow-500 hover:text-yellow-600 transition">
          Forgot password?
        </Link>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center px-5 py-4 text-black bg-yellow-500 hover:bg-yellow-600 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <LogIn className="w-5 h-5 mr-2" /> Sign In
      </button>

      {/* OR Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-3 text-gray-500">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google & Facebook Login */}
      <SocialLogin onGoogleSuccess={handleGoogleLoginSuccess} />

      {/* Sign Up Link */}
      <div className="text-center mt-4">
        <Link to="/sign-up" className="text-gray-800 hover:text-yellow-500 font-medium transition-all">
          New user? Create an account <ArrowRight className="w-4 h-4 inline-block" />
        </Link>
      </div>
    </form>
  )
}
