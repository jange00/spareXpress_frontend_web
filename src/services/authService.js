import { registerUserApi, loginUserApi, resetPasswordApi, requestResetPasswordApi } from "../api/authApi";

export const registerUserService = async (formData) => {
    try{
        const response = await registerUserApi(formData)
        return response.data // body of response
    }catch(err) {
        throw err.response?.data || { message: "Registration Failed" }
    }
}

export const loginUserService = async (formData) => {
    try {
      const response = await loginUserApi(formData)
      return response.data
    } catch (err) {
      
      const errorMessage = err?.response?.data?.message || "Login Failed"
      throw new Error(errorMessage)
    }
}  


export const requestResetPasswordService = async (formData) => {
  try {
    const response = await requestResetPasswordApi(formData)
    return response.data
  }catch(err){
    throw err.response?.data || {message: "Request password failed"}
  }
}

export const resetPasswordService = async (formData) => {
  try {
    console.log("Reset password data:", data, "Token", token)
    const response = await resetPasswordApi(data, token)
    return response.data
  }catch(err){
    throw err.response?.data || {message: "Reset password failed"}
  }
}