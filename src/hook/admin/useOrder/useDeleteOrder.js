// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteOrderService } from "../../../services/admin/orderService/deleteOrderService";

// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({ id, params }) => deleteOrderService(id, params),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["admin_order"]);
//       },
//       onError: (error) => {
//         console.error("Order deletion error:", error);
//       },
//     }
//   );
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderService } from "../../../services/admin/orderService/deleteOrderService";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  // FIX: Pass a single options object to useMutation
  return useMutation({
    // The mutation function is now a property called 'mutationFn'
    mutationFn: ({ id, params }) => deleteOrderService(id, params),

    onSuccess: () => {
      // Also, update invalidateQueries to the modern syntax
      queryClient.invalidateQueries({ queryKey: ["admin_order"] });
    },
    
    onError: (error) => {
      console.error("Order deletion error:", error);
    },
  });
};
 