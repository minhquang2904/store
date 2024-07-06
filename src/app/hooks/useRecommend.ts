import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetRecommend = () => {
  const { user } = useAuthContext();
  const [recommend, setRecommend] = useState(null) as any;
  const [fetchAgainRecommend, setFetchAgainRecommend] = useState(true);

  const triggerFetchRecommend = () => setFetchAgainRecommend(true);

  const fetchDataRecommend = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_HOST_API_DJANGO?.replace(
      /\/+$/,
      ""
    );
    const userId = user.id;
    const url = `${baseUrl}/get_data_history_order/?userId=${userId}`;
    console.log("Fetching data from get_data_history_order");

    try {
      const res = await fetch(url);
      const result = await res.json();
      const jsonParse = JSON.parse(result);
      const { data, message, status } = jsonParse;
      if (status === 200) {
        setRecommend(data);
      } else {
        setRecommend(null);
      }
    } catch (error) {
      setRecommend(null);
    }
  };

  useEffect(() => {
    if (user && !recommend) {
      console.log("Fetching data from useGetRecommend 2");
      fetchDataRecommend();
    }
  }, [user, recommend]);
  return { recommend, triggerFetchRecommend, fetchDataRecommend, setRecommend };
};

export default useGetRecommend;
