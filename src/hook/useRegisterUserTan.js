import { useMutation } from "@tanstack/react-query";
// useMutation for (POST/UPDATE(PUT/PATCH)/DELETE)

import { registerUserService } from "../services/authService";

export const useRegisterUserTan = () => {
    return useMutation(
        {
            mutationFn: registerUserService, 
            mutationKey: ['register'],
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    )
}