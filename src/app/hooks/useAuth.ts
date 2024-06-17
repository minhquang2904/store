import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);
  const path = usePathname();
  const router = useRouter();
  const token = Cookies.get("LOGIN-INFO-USER");

  useEffect(() => {
    const fetchDataWithToken = async () => {
      try {
        await fetch("/api/users/validation-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
          .then((res) => res.json())
          .then((result) => {
            const status = result.status;
            const data = result.data;
            console.log("data", data);
            if (status === 200) {
              setUser(data);
            }
            if (status === 400) {
              console.log(result.message);
              Cookies.remove("LOGIN-INFO-USER");
              router.push("/login");
            }
            if (status === 500) {
              console.log(result.error);
              Cookies.remove("LOGIN-INFO-USER");
              router.push("/login");
            }
            setLoadingAuth(false);
          });
      } catch (error) {
        console.error("There was a problem with token validation:", error);
        Cookies.remove("LOGIN-INFO-USER");
        router.push("/login");
      }
    };

    fetchDataWithToken();
  }, [path]);
  return { user, loadingAuth };
};

export default useAuth;
