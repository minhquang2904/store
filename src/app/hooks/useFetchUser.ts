import { useEffect, useState } from "react";

const useFetchUser = ({ id }: any) => {
  const [user, setUser] = useState(null) as any;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchDataWithToken = async () => {
      try {
        const res = await fetch("/api/users/information_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const result = await res.json();

        const status = result.status;
        const data = result.data;

        if (status === 200) {
          setUser(data);
        }
      } catch (error) {
        console.error("Get user Failed!", error);
      }
    };
    fetchDataWithToken();
  }, [id]);

  return user;
};

export default useFetchUser;
