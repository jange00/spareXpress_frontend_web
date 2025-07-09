import { useContext, useState } from "react"
import { Logo } from "../components/authComponents/login/logo"
import { LoginMethodSelector } from "../components/authComponents/login/loginMethodSelector"
import { SignInForm } from "../components/authComponents/login/signInForm"
import { useLoginUserTan } from "../hook/useLoginUserTan"
import { toast } from "react-toastify";
import { useNavigate } from "react-router"


const SignInPage = () => {
  const [loginMethod, setLoginMethod] = useState("email")
  const { mutate, data, error, isPending } = useLoginUserTan()
  const navigate = useNavigate()

  const handleMethodChange = (method) => {
    setLoginMethod(method)
  }

  const handleFormSubmit = (formData) => {
    console.log(formData)
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.role)
        const role=res.data.role;

        // login(res.user, res.token)
        localStorage.setItem("token", res.token)
        localStorage.setItem("user",res.data)
        localStorage.setItem("userid",res.data._id)
        localStorage.setItem("role",res.data.role)
        toast.success(data?.message || "Login Success")
        if(role==="Admin"){
          navigate("/admin/dashboard")
        }else{
          navigate("/")
        }

      },
      onError: (err) => {
        console.error("Login failed:", err.message)
        toast.error(err?.message || "Login Failed")
      }
    })
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
        <SignInForm loginMethod={loginMethod} onSubmit={handleFormSubmit}
         isLoading={isPending}
         serverError={error?.message} />
      </div>
    </div>
  )
}

export default SignInPage
