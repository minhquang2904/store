import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null) as any;
  const path = usePathname();
  console.log("result result result user", user);

  useEffect(() => {
    const fetchDataWithToken = async () => {
      try {
        const res = await fetch("/api/users/validation-token");
        const result = await res.json();

        const status = result.status;
        const data = result.data;
        console.log("result", data);
        if (status === 200) {
          setUser(data);
        }
        if (status === 400) {
          // console.log(result.message);
        }
        if (status === 500) {
          // console.log(result.error);
        }
        setLoadingAuth(false);
      } catch (error) {
        console.error("There was a problem with token validation:", error);
      }
    };
    fetchDataWithToken();
  }, [path]);

  return { id: user?.id, loadingAuth };
};

export default useAuth;
