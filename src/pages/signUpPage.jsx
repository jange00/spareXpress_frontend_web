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

import { useRegisterUserTan } from "../hook/useRegisterUserTan"

const SignUpPage = () => {
  const { mutate, data, isPending, isSuccess, isError, error: mutationError } = useRegisterUserTan()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    password: "",
    confirmPassword: "", 
    profilePicture: null,
    termsAccepted: false, 
  })

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [error, setError] = useState("")
  const [profilePreview, setProfilePreview] = useState(null)

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setFormData({ ...formData, password })
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

  // Fixed: Add form validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }


    const request = new FormData()
    request.append("fullname", formData.fullName)
    request.append("email", formData.email)
    request.append("phoneNumber", formData.phoneNumber)
    request.append("countryCode", formData.countryCode)
    request.append("password", formData.password)
    

    if (formData.profilePicture) {
      request.append("profilePicture", formData.profilePicture)
    }

    
    mutate(request, {
      onSuccess: (data) => {
        console.log("Registration successful:", data)
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          countryCode: "+1",
          password: "",
          confirmPassword: "", 
          profilePicture: null,
          termsAccepted: false, 
        })
        
      },
      onError: (error) => {
        console.error("Registration failed:", error)
        setError(error.message || "Registration failed. Please try again.")
      }
    })
  }

  
  const isLoading = isPending


  const displayError = error || (mutationError?.message)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ErrorMessage error={displayError} />

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
                required
              />

              {/* Email */}
              <FormInput
                id="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={Mail}
                required
              />

              {/* Phone Number */}
              <PhoneInput
                countryCode={formData.countryCode}
                onCountryCodeChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                phoneNumber={formData.phoneNumber}
                onPhoneChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                countryCodes={countryCodes}
                required
              />

              {/* Password */}
              <PasswordInput 
                id="password" 
                label="Password" 
                value={formData.password} 
                onChange={handlePasswordChange}
                required
              />

              {/* Confirm Password */}
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
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