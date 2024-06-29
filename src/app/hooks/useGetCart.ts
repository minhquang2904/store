import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

const useGetCart = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState(null) as any;
  const [loadingCart, setLoadingCart] = useState(false);
  const [fetchAgainCart, setFetchAgainCart] = useState(false);
  const path = usePathname();

  const triggerFetchCart = () => setFetchAgainCart(true);

  const fetchDataCart: any = async () => {
    setLoadingCart(true);
    console.log("fetchDataCart");
    try {
      const res = await fetch(`/api/product/cart?id=${user?.id}`);
      const result = await res.json();
      const status = result.status;
      const data = result.data;
      if (status === 200) {
        setCart(data);
      }
      if (
        status === 400 ||
        status === 500 ||
        status === 403 ||
        status === 404
      ) {
        setCart(null);
      }
      setLoadingCart(false);
      setFetchAgainCart(false);
    } catch (error) {
      console.error("There was a problem with fetching the cart:", error);
      setFetchAgainCart(false);
    }
  };

  useEffect(() => {
    if (user && !cart) {
      fetchDataCart();
    }
    if (user && cart && fetchAgainCart) {
      fetchDataCart();
    }
  }, [user, fetchAgainCart, path, cart]);

  return { cart, triggerFetchCart, loadingCart, setCart };
};

export default useGetCart;
