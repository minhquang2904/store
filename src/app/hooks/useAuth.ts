import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null) as any;
  const path = usePathname();

  useEffect(() => {
    const fetchDataWithToken = async () => {
      try {
        await fetch("/api/users/validation-token")
          .then((res) => res.json())
          .then((result) => {
            const status = result.status;
            const data = result.data;
            console.log("data", data);
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
          });
      } catch (error) {
        console.error("There was a problem with token validation:", error);
      }
    };

    fetchDataWithToken();
  }, [path]);

  return { id: user?.id, loadingAuth };
};

export default useAuth;
