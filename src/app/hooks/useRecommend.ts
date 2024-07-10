import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetRecommend = () => {
  const { user } = useAuthContext();
  const [recommend, setRecommend] = useState(null) as any;
  const [related, setRelated] = useState(null) as any;
  const [fetchAgainRecommend, setFetchAgainRecommend] = useState(true);

  const triggerFetchRecommend = () => setFetchAgainRecommend(true);

  const baseUrl = process.env.NEXT_PUBLIC_HOST_API_DJANGO?.replace(/\/+$/, "");
  const urlLocal = "http://127.0.0.1:8000";

  const fetchDataRecommend = async () => {
    const userId = user?.id;
    const url = `${baseUrl}/get_data_history_order/?userId=${userId}`;
    console.log("Fetching data from get_data_history_order", url);

    try {
      const res = await fetch(url);
      const result = await res.json();
      const jsonParse = JSON.parse(result);
      const { data, message, status } = jsonParse;
      console.log("data---", data);
      if (status === 200) {
        setRecommend(data);
      } else {
        setRecommend(null);
      }
    } catch (error) {
      setRecommend(null);
    }
  };

  const fetchDataRelated = async () => {
    const userId = user?.id;
    const url = `${baseUrl}/get_related_product_user/?userId=${userId}`;
    console.log("Fetching data from get_related_product_user");

    try {
      const res = await fetch(url);
      const result = await res.json();
      const jsonParse = JSON.parse(result);
      const { data, message, status } = jsonParse;

      if (status === 200) {
        setRelated(data);
      } else {
        setRelated(null);
      }
    } catch (error) {
      setRelated(null);
    }
  };

  useEffect(() => {
    if (user && !recommend) {
      console.log("Fetching data from useGetRecommend 2");
      fetchDataRecommend();
    }
  }, [user, recommend]);

  useEffect(() => {
    if (user && !related) {
      console.log("Fetching data from useGetRecommend 1");
      fetchDataRelated();
    }
  }, [user, related]);

  return {
    recommend,
    triggerFetchRecommend,
    fetchDataRecommend,
    setRecommend,
    related,
    setRelated,
  };
};

export default useGetRecommend;
