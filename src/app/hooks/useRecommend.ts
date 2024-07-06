import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

const useGetRecommend = () => {
  const { user } = useAuthContext();
  const { cart } = useCartContext();
  const [recommend, setRecommend] = useState(null) as any;
  const [fetchAgainRecommend, setFetchAgainRecommend] = useState(true);

  const triggerFetchRecommend = () => setFetchAgainRecommend(true);

  const fetchDataRecommend = async () => {
    const url = `https://recommend-product-akle.onrender.com/get_data_history_order/?userId=${user.id}`;
    console.log("Fetching data from ", url);

    try {
      const res = await fetch(url);
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
      console.log("Data fetched:", error);
      setRecommend(null);
    }
  };

  useEffect(() => {
    if (user && !recommend) {
      console.log("Fetching data from useGetRecommend 2");
      fetchDataRecommend();
    }
  }, [user, recommend]);
  return { recommend, triggerFetchRecommend, fetchDataRecommend };
};

export default useGetRecommend;
