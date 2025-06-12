import { useMutation } from "@tanstack/react-query";
// useMutation for (POST/UPDATE(PUT/PATCH)/DELETE)

import { loginUserService } from "../services/authService";

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