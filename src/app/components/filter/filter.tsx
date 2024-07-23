import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const order = ["s", "m", "l", "xl", "xxl"];

const TitleFilter = (props: any) => {
  const { title } = props;
  return (
    <h1 className="text-text text-[1.8em] capitalize mb-[8px] xsm:mb-[0] sm:mb-[0] font-semibold flex flex-col">
      {title}
    </h1>
  );
};

const Filter = (props: any) => {
  const { initial } = props;
  const [categories, setCategories] = useState(null) as any;
  const [size, setSize] = useState(null) as any;
  const [selectedFilters, setSelectedFilters] = useState({}) as any;
  const { push } = useRouter();
  const searchParams = useSearchParams();
  console.log("searchParams--", searchParams.get("categories"));
  useEffect(() => {
    setSelectedFilters({ categories: [initial] });
  }, []);
  console.log("selectedFilters--", selectedFilters);

  const handleShowFilter = () => {
    document.querySelector(".filterIcon")?.classList.toggle("activeFilter");
  };

  useEffect(() => {
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

    getData();
  }, []);

  const handleCheckboxChange = (value: any, filterType: any) => {
    setSelectedFilters((prevFilters: any) => {
      const newFilters = { ...prevFilters };
      newFilters[filterType] = value;
      console.log(newFilters);
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const applyFilters = (filters: any) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((filterType) => {
      if (filters[filterType].length > 0) {
        params.append(filterType, filters[filterType].join(" "));
      }
    });
    console.log(params.toString());
    const queryString = `/category?${params.toString()}`;
    push(queryString);
  };

  return (
    <div className="w-full l:w-[30%] mr-[16px]">
      <div
        className="xsm:inline-flex sm:inline-flex l:hidden mb-[16px] bg-button items-center justify-center px-[20px] py-[8px] rounded-[10px]"
        onClick={handleShowFilter}
      >
        <svg
          width="20"
          height="20"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-white text-[2em] ml-[8px]">Filter</h1>
      </div>
      <div className="filterIcon duration-500 ease-in-out xsm:max-h-[0] sm:max-h-[0] l:!max-h-[100%] l:h-[100%] [&.activeFilter]:xsm:max-h-[800px] [&.activeFilter]:sm:max-h-[800px] overflow-hidden flex flex-col">
        <div className="mb-[16px] xsm:mb-[8px]">
          <TitleFilter title="product categories" />
          <CheckboxGroup
            onChange={(value) => handleCheckboxChange(value, "categories")}
            value={selectedFilters.categories || []}
          >
            <div className="flex md:flex-col xsm:flex-row sm:flex-row flex-wrap capitalize gap-y-[8px] gap-x-[20px] mt-[8px] text-text font-medium">
              {categories?.map((categoriesItem: any) => {
                return (
                  <CustomCheckbox
                    key={categoriesItem._id}
                    title={categoriesItem.categories}
                  />
                );
              })}
            </div>
          </CheckboxGroup>
        </div>
        <div className="mb-[16px] xsm:mb-[8px]">
          <TitleFilter title="Filter by size" />
          <CheckboxGroup
            onChange={(value) => handleCheckboxChange(value, "sizes")}
            value={selectedFilters.sizes || []}
          >
            <div className="flex md:flex-col xsm:flex-row sm:flex-row flex-wrap capitalize gap-y-[8px] gap-x-[20px] mt-[8px] text-text font-medium">
              {size
                ?.sort(
                  (a: any, b: any) =>
                    order.indexOf(a.sizes) - order.indexOf(b.sizes)
                )
                .map((sizeItem: any) => {
                  return (
                    <CustomCheckbox key={sizeItem._id} title={sizeItem.sizes} />
                  );
                })}
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};

const CustomCheckbox = (props: any) => {
  const { title } = props;
  return (
    <Checkbox
      value={title}
      size="lg"
      borderColor="#E4E5F0"
      iconColor="white"
      spacing="10px"
      _checked={{
        "& .chakra-checkbox__control": {
          background: "#131118",
          borderColor: "#131118",
        },
      }}
      sx={{
        "& .chakra-checkbox__control": {
          borderRadius: "5px",
        },
        "& .chakra-checkbox__label": {
          fontSize: "14px",
          color: "#131118",
          textTransform: "uppercase",
        },
      }}
      _hover={{
        borderColor: "#131118",
      }}
    >
      {title}
    </Checkbox>
  );
};

export default Filter;
