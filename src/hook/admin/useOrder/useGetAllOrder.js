import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrderService } from "../../../services/admin/orderService/getAllOrderService";

export const useGetAllOrder = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["admin_order"],
    queryFn: () =>
      getAllOrderService({
        // page: pageNumber,
        // limit: pageSize,
        // search: search,
      }),
    // keepPreviousData: true,
  });

  const orders = query.data?.data || [];

  return {
    ...query,
    orders,
    // pagination,
    // canPreviousPage,
    // canNextPage,
    // setPageNumber,
    // setPageSize,
    // setSearch,
  };
};
