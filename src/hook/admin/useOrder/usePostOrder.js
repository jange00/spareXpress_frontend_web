import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrderService } from "../../../services/admin/orderService/postOrderService";

// export const usePostOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation(mutationFn: postOrderService, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["admin_order"]);
//     },
//     onError: (error) => {
//       console.error("Order creation error:", error);
//     },
//   });
// };

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOrderService, 
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["admin_order"] });
    },
    onError: (error) => {
      console.error("Order creation error:", error);
    },
  });
};
