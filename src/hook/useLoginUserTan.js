import { useMutation } from "@tanstack/react-query";
// useMutation for (POST/UPDATE(PUT/PATCH)/DELETE)

import { loginUserService, requestResetPasswordService, resetPasswordService } from "../services/authService";
import { toast } from "react-toastify";

export const useLoginUserTan = () => {
    return useMutation(
        {
            mutationFn: loginUserService, 
            mutationKey: ['login'],
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    )
}

export const useRequestResetPassword = () => {
    return useMutation({
        mutationFn: requestResetPasswordService,
        mutationKey: ["request-reset"],
        onSuccess: (data) => {
            toast.success(data.message || "Email sent")
        },
        onError: (error) => {
            toast.error(error.message || "Request failed")
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationKey: ["reset-password"],
        mutationFn: ({data, token}) => resetPasswordService(data,token),
        onSuccess: (data) => {
            toast.success(data.message || "Email sent")
        },
        onError: (error) => {
            toast.error(error.message || "Request failed")
        },
    });
}