import { useState } from "react"
import { Logo } from "../components/authComponents/login/logo"
import { LoginMethodSelector } from "../components/authComponents/login/loginMethodSelector"
import { SignInForm } from "../components/authComponents/login/signInForm"

const SignInPage = () => {
  const [loginMethod, setLoginMethod] = useState("email")

  const handleMethodChange = (method) => {
    setLoginMethod(method)
  }

  const handleFormSubmit = (formData) => {
    console.log("Sign in attempt with:", formData)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-10 shadow-xl rounded-xl border border-gray-200 relative ">
        {/* Logo */}
        <Logo />

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="mt-2 text-gray-600">Sign in to access your account and start shopping</p>
        </div>

        {/* Login Method Selector */}
        <LoginMethodSelector loginMethod={loginMethod} onMethodChange={handleMethodChange} />

        {/* Form */}
        <SignInForm loginMethod={loginMethod} onSubmit={handleFormSubmit} />
      </div>
    </div>
  )
}

export default SignInPage
