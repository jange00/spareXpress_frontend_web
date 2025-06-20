import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductService} from "../../../services/admin/productService/getAllProductService"

export const useGetAllProduct = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["admin_product"],
    queryFn: () =>
      getAllProductService({
        // page: pageNumber,
        // limit: pageSize,
        // search: search,
      }),
    // keepPreviousData: true,
  });

  const products = query.data?.data || [];
//   const pagination = query.data?.pagination || {
//     page: 1,
//     totalPages: 1,
//     limit: 10,
//   };
//   const canPreviousPage = pagination.page > 1;
//   const canNextPage = pagination.page < pagination.totalPages;

  return {
    ...query,
    products,
    // pagination,
    // canPreviousPage,
    // canNextPage,
    // setPageNumber,
    // setPageSize,
    // setSearch,
  };
};
