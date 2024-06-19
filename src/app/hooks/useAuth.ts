import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null) as any;
  const path = usePathname();

  useEffect(() => {
    const fetchDataWithToken = async () => {
      console.log("fetchDataWithToken");
      try {
        const res = await fetch("/api/users/validation-token");
        const result = await res.json();

        const status = result.status;
        const data = result.data;
        if (status === 200) {
          setUser(data);
        }
        if (status === 400) {
          // console.log(result.message);
        }
        if (status === 500) {
          // console.log(result.error);
        }
      } catch (error) {
        console.error("There was a problem with token validation:", error);
      }
    };

    if (!user) {
      fetchDataWithToken();
    }
  }, [path, user]);

  return { id: user?.id, loadingAuth, setLoadingAuth };
};

export default useAuth;
