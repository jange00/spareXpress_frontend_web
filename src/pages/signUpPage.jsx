import { useState } from "react"
import { User, Mail } from "lucide-react"

import Header from "../components/authComponents/signUp/header"
import ProfilePictureUpload from "../components/authComponents/signUp/profilePictureUpload"
import FormInput from "../components/authComponents/signUp/formInput"
import PhoneInput from "../components/authComponents/signUp/phoneInput"
import PasswordInput from "../components/authComponents/signUp/passwordInput"
import PasswordStrength from "../components/authComponents/signUp/passwordStrength"
import TermsCheckbox from "../components/authComponents/signUp/termsCheckbox"
import SubmitButton from "../components/authComponents/signUp/submitButton"
import LoginLink from "../components/authComponents/signUp/loginLink"
import ErrorMessage from "../components/authComponents/signUp/errorMessage"
import { passwordRequirements, calculatePasswordStrength } from "../components/authComponents/signUp/passwordUtils"
import { countryCodes } from "../components/authComponents/signUp/countryCodes"

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    // street: "",
    // city: "",
    // state: "",
    // zipCode: "",
    // country: "",
    termsAccepted: false,
  })

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [profilePreview, setProfilePreview] = useState(null)

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setFormData({ ...formData, password })
    // Calculate password strength
    setPasswordStrength(calculatePasswordStrength(password, passwordRequirements))
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, profilePicture: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setError("")
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Sign up attempt with:", formData)
      // Handle successful signup
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ErrorMessage error={error} />

            <ProfilePictureUpload
              profilePreview={profilePreview}
              handleProfilePictureChange={handleProfilePictureChange}
            />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <FormInput
                id="fullName"
                type="text"
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                icon={User}
              />

              {/* Email */}
              <FormInput
                id="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={Mail}
              />

              {/* Phone Number */}
              <PhoneInput
                countryCode={formData.countryCode}
                onCountryCodeChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                phone={formData.phone}
                onPhoneChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                countryCodes={countryCodes}
              />

              {/* Password */}
              <PasswordInput id="password" label="Password" value={formData.password} onChange={handlePasswordChange} />

              {/* Confirm Password */}
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {/* Password Strength Indicator */}
            <PasswordStrength
              password={formData.password}
              passwordStrength={passwordStrength}
              requirements={passwordRequirements}
            />

            {/* Terms and Conditions */}
            <TermsCheckbox
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            />

            {/* Submit Button */}
            <SubmitButton isLoading={isLoading} />

            {/* Login Link */}
            <LoginLink />
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
