import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

const useGetRecommend = () => {
  const { user } = useAuthContext();
  const { cart } = useCartContext();
  const [recommend, setRecommend] = useState(null) as any;
  const [fetchAgainRecommend, setFetchAgainRecommend] = useState(false);

  const triggerFetchRecommend = () => setFetchAgainRecommend(true);

  const fetchDataRecommend = async () => {
    console.log("Fetching data for user 123 131 3ddd:", user.id);

    // `http://localhost:8000/get_data_history_order/?userId=${user.id}`
    try {
      const res = await fetch(
        `https://recommend-product-akle.onrender.com/get_data_history_order/?userId=${user.id}`
      );
      const result = await res.json();
      const jsonParse = JSON.parse(result);
      console.log("Data fetched:", jsonParse);
      const { data, message, status } = jsonParse;
      if (status === 200) {
        setRecommend(data);
        console.log("Data fetched:", data);
      } else {
        setRecommend(null);
        console.log("Data fetched:", message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user && cart) {
      fetchDataRecommend();
    }
  }, [user, fetchAgainRecommend, cart]);

  return { recommend, triggerFetchRecommend };
};

export default useGetRecommend;
