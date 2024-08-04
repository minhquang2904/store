import { useEffect, useState } from "react";

const useNav = () => {
  const [nav, setNav] = useState(true) as any;
  return { nav, setNav };
};

export default useNav;
