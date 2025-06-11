import { registerUserApi } from "../api/authApi";

export const registerUserService = async (formData) => {
    try{
        const response = await registerUserApi(formData)
        return response.data // body of response
    }catch(err) {
        throw err.response?.data || { message: "Registration Failed" }
    }
}

export const loginUserService = async(formData) => {
    try{
        const response = await loginUserApi(formData)
        return response.data
    }catch (err) {
        throw err.message?.data || { message: "Login Failed" }
    }
}