import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const urlPageLogin = ["/signup", "/login", "/admin/login"];
const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null) as any;
  const [admin, setAdmin] = useState(null) as any;
  const path = usePathname();
  const { push } = useRouter();
  const [fetchAgain, setFetchAgain] = useState(false);

  const triggerFetch = () => setFetchAgain(true);

  const endpointAdmin = "/api/admin/validation-token";
  const endpointUser = "/api/users/validation-token";

  const fetchDataWithTokenAdmin: any = async () => {
    setLoadingAuth(true);
    console.log("fetchDataWithTokenAdmin");
    try {
      const res = await fetch(endpointAdmin);
      const result = await res.json();

      const status = result.status;
      const data = result.data;
      if (status === 200) {
        setAdmin(data);
      }
      if (
        status === 400 ||
        status === 500 ||
        status === 403 ||
        status === 404
      ) {
        setUser(null);
        push("/admin/login");
      }
      setLoadingAuth(false);
      setFetchAgain(false);
    } catch (error) {
      console.error("There was a problem with token validation:", error);
      setLoadingAuth(false);
      setFetchAgain(false);
    }
  };

  const fetchDataWithTokenUser: any = async () => {
    setLoadingAuth(true);
    console.log("fetchDataWithTokenUser");
    try {
      const res = await fetch(endpointUser);
      const result = await res.json();

      const status = result.status;
      const data = result.data;
      if (status === 200) {
        setUser(data);
      }
      if (
        status === 400 ||
        status === 500 ||
        status === 403 ||
        status === 404
      ) {
        setUser(null);
        push("/login");
      }
      setLoadingAuth(false);
      setFetchAgain(false);
    } catch (error) {
      console.error("There was a problem with token validation:", error);
      setLoadingAuth(false);
      setFetchAgain(false);
    }
  };
  useEffect(() => {
    if (!urlPageLogin.includes(path)) {
      if (path.startsWith("/admin")) {
        if (!admin) {
          fetchDataWithTokenAdmin();
        }
      } else {
        if (!user) {
          fetchDataWithTokenUser();
        } else if (fetchAgain && user) {
          fetchDataWithTokenUser();
        }
      }
    }
  }, [path, user, admin, fetchAgain]);

  return {
    user,
    loadingAuth,
    setLoadingAuth,
    setUser,
    triggerFetch,
    admin,
    setAdmin,
  };
};

export default useAuth;
