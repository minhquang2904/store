import { useEffect, useState } from "react";

const useFilter = () => {
  const [categories, setCategories] = useState(null) as any;
  const [size, setSize] = useState(null) as any;

  const getData = async () => {
    try {
      const [resCategoriesData, resSizeData] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/sizes"),
      ]);

      const [resultCategories, resultSize] = await Promise.all([
        resCategoriesData.json(),
        resSizeData.json(),
      ]);

      setCategories(resultCategories.data);
      setSize(resultSize.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!categories && !size) {
      getData();
    }
  }, [categories, size]);

  return { categories, size };
};

export default useFilter;
