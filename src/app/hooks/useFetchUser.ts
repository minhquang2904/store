import { useEffect, useState } from "react";

const useFetchUser = ({ id }: any) => {
  const [user, setUser] = useState(null) as any;

  useEffect(() => {
    console.log("re-render", "re-render");
    // if (!id) {
    //   return;
    // }
    const fetchDataWithToken = async () => {
      try {
        await fetch("/api/users/information_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })
          .then((res) => res.json())
          .then((result) => {
            const status = result.status;
            const data = result.data;
            if (status === 200) {
              setUser(data);
            }
          });
      } catch (error) {
        console.error("Get user Failed!", error);
      }
    };
    fetchDataWithToken();
  }, [id]);

  return user;
};

export default useFetchUser;
