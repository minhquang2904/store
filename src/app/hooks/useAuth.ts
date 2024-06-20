import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const urlPageLogin = ["/signup", "/login", "/admin/login"];
const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null) as any;
  const path = usePathname();

  const endpoint = path.startsWith("/admin")
    ? ""
    : "/api/users/validation-token";

  useEffect(() => {
    if (!urlPageLogin.includes(path)) {
      const fetchDataWithToken = async () => {
        setLoadingAuth(true);
        console.log("fetchDataWithToken");
        try {
          const res = await fetch(endpoint);
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
          setLoadingAuth(false);
        } catch (error) {
          console.error("There was a problem with token validation:", error);
        }
      };

      if (!user) {
        fetchDataWithToken();
      }
    }
  }, [path, user]);

  return { user, loadingAuth, setLoadingAuth, setUser };
};

export default useAuth;
