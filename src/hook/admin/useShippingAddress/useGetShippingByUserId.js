import { useEffect, useState } from "react";
import { getShippingAddressByUserIdApi } from "../../../api/admin/shippingAddressApi";

export const useGetShippingByUserId = (userId) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getShippingAddressByUserIdApi(userId)
      .then((res) => {
        setData(res.data.data || []);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, isLoading, error };
};
