import { useMutation } from "@tanstack/react-query";
// useMutation for (POST/UPDATE(PUT/PATCH)/DELETE)

import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useRegisterUserTan = () => {
    return useMutation(
        {
            mutationFn: registerUserService, 
            mutationKey: ['register'],
            onSuccess: (data) => {
                console.log(data)
                toast.success(data.message || "Registration Successfully")
            },
            onError: (err) => {
                console.log(err)
                toast.error(err.message || "Registration Failed")
            }
        }
    )
}