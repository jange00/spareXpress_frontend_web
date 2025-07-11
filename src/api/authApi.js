import { data } from "react-router";
import axios from "./api";

export const registerUserApi = (data) => axios.post("/auth/register", data)
export const loginUserApi = (data) => axios.post("/auth/login", data)

// Reset password
export const requestResetPasswordApi = (data) => axios.post("/auth/request-reset", data)

export const resetPasswordApi = (data, token) => axios.post("/auth/request-password" + token, data)

