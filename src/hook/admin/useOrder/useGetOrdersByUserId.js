import { useEffect, useState } from "react";
import { getOrderByUserIdApi } from "../../../api/admin/orderApi";

export const useGetOrdersByUserId = (userId) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getOrderByUserIdApi(userId)
      .then((res) => {
        console.log("API response for orders:", res);
        setData(res.data.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error("API error fetching orders:", err);
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, isLoading, error };
};
