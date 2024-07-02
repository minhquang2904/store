"use client";
import ContentTable from "@/app/components/contentTable/conentTable";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import TitleTable from "@/app/components/titleTable/titleTable";
import { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import LoadingModal from "@/app/components/loadingModal/loadingModal";
import Link from "next/link";
import Image from "next/image";
import LabelInput from "@/app/components/labelInput/labelInput";
import style from "./lists.module.scss";
import Pagination from "@/app/components/pagination/pagination";
import LoadingTable from "@/app/components/loadingTable/loadingTable";
import toast from "react-hot-toast";

const ListsProduct = () => {
  const [products, setProducts] = useState([]) as any;
  const [modalDelete, setModalDelete] = useState(false);
  const [modalSee, setModalSee] = useState(false);
  const [modalImage, setModalImage] = useState(false) as any;
  const [dataModalDelete, setDataModalDelete] = useState(null) as any;
  const [dataModalSee, setDataModalSee] = useState(null) as any;
  const [dataModalImage, setDataModalImage] = useState(null) as any;
  const [resultModal, setResultModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(null) as any;
  const [loadingModal, setLoadingModal] = useState(false) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [noProduct, setNoProduct] = useState(false) as any;

  const fetchData = () => {
    setLoadingData(true);
    try {
      fetch(`/api/admin/product?page=${currentPage}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setTotalPages(data.totalPages);
            setProducts(data.data);
            data.data.length > 0 ? setNoProduct(false) : setNoProduct(true);
            if (data.data.length == 0) {
              setCurrentPage(data.totalPages);
            }
          }
          if (data.status === 400) {
            console.error(data.message);
          }
          setLoadingData(false);
          setLoadingTable(false);
        });
    } catch (error) {
      console.error("Error in fetchData: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    document.title = "Luxe Loft | " + "List products";
  }, []);

  const handleShowModalDelete = (id: any, name: any) => {
    setDataModalDelete({ id, name });
    setModalDelete(true);
  };
  const handleCloseModalDelete = () => setModalDelete(false);

  const handleShowModalDetail = (product: any) => {
    setDataModalSee(product);
    setModalSee(true);
  };

  const handleCloseModalDetail = () => setModalSee(false);

  const handleCloseModalImage = () => setModalImage(false);

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setLoadingData(true);
      setCurrentPage(page);
    }
  };

  return (
    <>
      <TitlePageAmin
        title="Product - Lists Product"
        style={{ fontSize: "14px" }}
      />
      <div className="overflow-x-auto min-h-[705px] relative">
        <table className="min-w-full">
          <thead>
            <tr>
              <TitleTable title="Name" />
              <TitleTable title="Categories" />
              <TitleTable title="Sub Categories" />
              <TitleTable title="Total Quantity" />
              <TitleTable title="Price" />
              <TitleTable title="Discount" />
              <TitleTable title="Discounted Price" />
              <TitleTable title="Action" />
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product: any) => (
                <tr
                  key={product._id}
                  className={`${loadingData ? "animate-pulse" : ""}`}
                >
                  <ContentTable
                    title={product.name}
                    styleCustom="xsm:!min-w-[140px] xsm:!py-[0]"
                  />
                  <ContentTable title={product.categories} />
                  <ContentTable
                    title={product.sub_categories}
                    styleCustom="xsm:!min-w-[140px]"
                  />
                  <ContentTable title={product.quantity} />
                  <ContentTable title={product.price} />
                  <ContentTable title={product.discount} />
                  <ContentTable title={product.discountedPrice} />
                  <td className="font-normal px-[10px] py-[14px] text-text text-[1.6em] text-start capitalize flex gap-x-[14px]">
                    <div
                      className="inline-block cursor-pointer bg-[#FFF3CD] p-[8px] rounded-[12px] hover:opacity-80 duration-200"
                      onClick={() => handleShowModalDetail(product)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22"
                        viewBox="0 0 24 24"
                        width="22"
                        fill="none"
                        stroke="#956424"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <Link
                      href={`/admin/product/lists/${product._id}`}
                      className="inline-block cursor-pointer bg-[#CCE5FF] p-[8px] rounded-[12px] hover:opacity-80 duration-200"
                    >
                      <svg
                        fill="none"
                        height="22"
                        viewBox="0 0 24 24"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="#2140A5">
                          <path d="m15 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h2c.41 0 .75.34.75.75s-.34.75-.75.75h-2c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 5.43-2.32 7.75-7.75 7.75z" />
                          <path d="m8.49935 17.6901c-.61 0-1.17-.22-1.58-.62-.49-.49-.7-1.2-.59-1.95l.43-3.01c.08-.58.46-1.33.87-1.74l7.87995-7.88004c1.99-1.990001 4.01-1.990001 6 0 1.09 1.09 1.58 2.2 1.48 3.31-.09.9-.57 1.78-1.48 2.68l-7.88 7.88004c-.41.41-1.16.79-1.74.87l-3.00995.43c-.13.03-.26.03-.38.03zm8.06995-14.14004-7.87995 7.88004c-.19.19-.41.63-.45.89l-.43 3.01c-.04.29.02.53.17.68s.39.21.68.17l3.00995-.43c.26-.04.71-.26.89-.45l7.88-7.88004c.65-.65.99-1.23 1.04-1.77.06-.65-.28-1.34-1.04-2.11-1.6-1.6-2.7-1.15-3.87.01z" />
                          <path d="m19.8496 9.82978c-.07 0-.14-.01-.2-.03-2.63-.74-4.72-2.83-5.46-5.46-.11-.4.12-.81.52-.93.4-.11.81.12.92.52.6 2.13 2.29 3.82 4.42 4.42.4.11.63.53.52.93-.09.34-.39.55-.72.55z" />
                        </g>
                      </svg>
                    </Link>
                    <div
                      className="inline-block cursor-pointer bg-[#F8D7DA] p-[8px] rounded-[12px] hover:opacity-80 duration-200"
                      onClick={() =>
                        handleShowModalDelete(product._id, product.name)
                      }
                    >
                      <svg
                        fill="none"
                        height="22"
                        viewBox="0 0 24 24"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          stroke="#ff6f61"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="m3 6h18m-16 0v14c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2v-14m-11 0v-2c0-1.10457.89543-2 2-2h4c1.1046 0 2 .89543 2 2v2"></path>
                          <path d="m14 11v6"></path>
                          <path d="m10 11v6"></path>
                        </g>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {products.length === 0 && loadingTable && <LoadingTable />}
        {noProduct && (
          <div className="w-full h-full justify-center items-center flex mt-[100px]">
            <Image
              src="/images/no_product.png"
              alt={"no_product"}
              className="!max-h-[400px] !max-w-[400px] xsm:!max-w-[400px] !relative select-none"
              fill
              sizes="(max-width: 100px) 100vw"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="pb-[16px]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <LoadingModal
        title={dataLoading}
        loading={loadingModal}
        resultModal={resultModal}
        styleCustom="max-w-[300px]"
      />
      {modalImage && (
        <ModalImage
          data={dataModalImage}
          onClose={handleCloseModalImage}
          isOpen={modalImage}
        />
      )}
      {modalSee && (
        <ModalSee
          isOpen={modalSee}
          onClose={handleCloseModalDetail}
          data={dataModalSee}
          setModalImage={setModalImage}
          setDataModalImage={setDataModalImage}
        />
      )}
      {modalDelete && (
        <ModalDelete
          isOpen={modalDelete}
          onClose={handleCloseModalDelete}
          data={dataModalDelete}
          setProducts={setProducts}
          setResultModal={setResultModal}
          setDataLoading={setDataLoading}
          setLoadingModal={setLoadingModal}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

const ModalImage = (props: any) => {
  const { data, isOpen, onClose } = props;
  const [index, setIndex] = useState(0) as any;
  const touchStartX = useRef(0);

  useEffect(() => {
    setIndex(data?.index);
  }, [isOpen]);

  const handleNext = () =>
    index < data.files.length - 1 ? setIndex(index + 1) : setIndex(0);

  const handlePrev = () =>
    index > 0 ? setIndex(index - 1) : setIndex(data.files.length - 1);

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: any) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX.current) {
      setIndex((prevIndex: any) => (prevIndex + 1) % data.files.length);
    } else if (touchEndX > touchStartX.current) {
      setIndex(
        (prevIndex: any) =>
          (prevIndex - 1 + data.files.length) % data.files.length
      );
    }
  };
  return (
    <div className="fixed flex z-[5000] duration-200 top-[0] bottom-[0] left-[0] right-[0] items-center">
      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.6)]"></div>
      <div className="w-full">
        <div
          className="absolute right-[30px] top-[30px] cursor-pointer hover:opacity-80 duration-200"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <div className="relative w-full flex justify-center">
          {data?.files.length > 1 && (
            <div className="xsm:hidden">
              <div
                className="absolute left-[0] top-[0] w-[200px] h-full cursor-pointer bg-[transparent] hover:bg-[rgba(0,0,0,0.05)] flex justify-center items-center"
                onClick={handlePrev}
              >
                <svg
                  fill="none"
                  height="50"
                  viewBox="0 0 24 24"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 19.9201-6.52003-6.52c-.77-.77-.77-2.03 0-2.8l6.52003-6.52002"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div
                className="absolute right-[0] top-[0] w-[200px] h-full cursor-pointer bg-[transparent] hover:bg-[rgba(0,0,0,0.05)] flex items-center justify-center"
                onClick={handleNext}
              >
                <svg
                  fill="none"
                  height="50"
                  viewBox="0 0 24 24"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m8.91003 19.9201 6.51997-6.52c.77-.77.77-2.03 0-2.8l-6.51997-6.52002"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          )}
          <div
            className="max-w-[800px] max-h-[auto] !relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {data && (
              <Image
                src={data.files[index].url}
                alt={`Uploaded ${data.files[index]}`}
                className="!max-h-[auto] !max-w-[800px] xsm:!max-w-[400px] !relative object-cover object-center select-none"
                fill
                sizes="(max-width: 100px) 100vw"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalSee = (props: any) => {
  const { isOpen, onClose, data, setModalImage, setDataModalImage } = props;

  const {
    _id,
    name,
    files,
    subName,
    description,
    categories,
    sub_categories,
    sexs,
    price,
    quantity,
    discount,
    discountedPrice,
    colors,
    sizes,
  } = data;

  let result: any = {};
  for (let obj of sizes) {
    let key = obj.color;
    if (!result[key]) {
      result[key] = {
        color: obj.color,
        sizes: [{ size: obj.size, amount: obj.amount }],
      };
    } else {
      result[key].sizes.push({ size: obj.size, amount: obj.amount });
    }
  }
  let newArrSize = Object.values(result);

  const handleShowModalImage = (files: any, index: any) => {
    setDataModalImage({ files, index });
    setModalImage(true);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"30px 10px 10px 10px "}
        margin={"auto 15px auto 15px"}
        className="l:min-w-[800px] xsm:!max-w-[400px] sm:min-w-[700px] xsm:max-h-[600px]"
      >
        <ModalBody
          className={`${style.tableScroll} flex flex-col gap-y-[20px] overflow-y-auto max-h-[600px] xsm:!px-[10px]`}
        >
          <h1 className="text-[2.2em] text-text mb-[12px] capitalize">
            {name}
          </h1>
          <div>
            <LabelInput name="images" styleCustom="!mb-[4px]" />
            <div className="flex xsm:gap-x-[12px] xsm:gap-y-[12px] l:gap-x-[20px] sm:gap-x-[12px] xsm:flex-wrap">
              {files &&
                files?.map((file: any, index: any) => {
                  return (
                    <div
                      key={file.public_id}
                      className="relative inline-block group overflow-hidden rounded-[16px] !h-[100px] !w-[100px] cursor-pointer"
                      onClick={() => handleShowModalImage(files, index)}
                    >
                      <div className="!relative group duration-200">
                        <Image
                          src={file.url}
                          alt={`Image ${index}`}
                          className="object-cover object-top !h-[100px] !w-[100px] !relative"
                          fill
                          sizes="(max-width: 100px) 100vw"
                          loading="lazy"
                        />
                        <div className="absolute bg-[rgba(0,0,0,0.7)] top-[0] left-[0] bottom-[0] right-[0] hidden group-hover:flex justify-center items-center">
                          <svg
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="#fff">
                              <path d="m5 6c0-.55228.44772-1 1-1h2c.55228 0 1-.44772 1-1s-.44772-1-1-1h-2c-1.65685 0-3 1.34315-3 3v2c0 .55228.44772 1 1 1s1-.44772 1-1z" />
                              <path d="m5 18c0 .5523.44772 1 1 1h2c.55228 0 1 .4477 1 1s-.44772 1-1 1h-2c-1.65685 0-3-1.3431-3-3v-2c0-.5523.44772-1 1-1s1 .4477 1 1z" />
                              <path d="m18 5c.5523 0 1 .44772 1 1v2c0 .55228.4477 1 1 1s1-.44772 1-1v-2c0-1.65685-1.3431-3-3-3h-2c-.5523 0-1 .44772-1 1s.4477 1 1 1z" />
                              <path d="m19 18c0 .5523-.4477 1-1 1h-2c-.5523 0-1 .4477-1 1s.4477 1 1 1h2c1.6569 0 3-1.3431 3-3v-2c0-.5523-.4477-1-1-1s-1 .4477-1 1z" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="subName" title={subName} />
            <LabelAndInput label="categories" title={categories} />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="sub_categories" title={sub_categories} />
            <LabelAndInput label="sexs" title={sexs} />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="price" title={price} />
            <LabelAndInput label="discount" title={discount} />
          </div>
          <div className="flex xsm:flex-col xsm:gap-y-[16px]">
            <LabelAndInput label="discounted Price" title={discountedPrice} />
            <LabelAndInput label="quantity" title={quantity} />
          </div>
          <div>
            <LabelInput name="Colors" styleCustom="!mb-[4px]" />
            <div className="flex gap-x-[12px] flex-wrap gap-y-[8px]">
              {colors?.map((color: any, index: any) => {
                return (
                  <TitleSee
                    key={`${color}-${index}`}
                    title={color.value}
                    styleCustom="border-[1px] py-[8px] px-[16px] border-solid border-button rounded-[20px]"
                  />
                );
              })}
            </div>
          </div>
          <div>
            <LabelInput name="size" styleCustom="!mb-[4px]" />
            <div className="flex flex-col gap-y-[12px]">
              {newArrSize.map((color: any, colorIndex: any) => {
                return (
                  <div key={colorIndex} className="mb-[4px]">
                    <TitleSee key={`color-${colorIndex}`} title={color.color} />
                    <div className="flex gap-x-[20px] flex-wrap xsm:gap-y-[4px]">
                      {color.sizes.map((size: any, sizeIndex: any) => {
                        return (
                          <TitleSee
                            key={`size-${colorIndex}-${sizeIndex}`}
                            title={`${size.size} - ${size.amount}`}
                            styleCustom="!uppercase"
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <LabelInput name="description" styleCustom="!mb-[4px]" />
            <TitleSee title={description} />
          </div>
        </ModalBody>
        <ModalFooter className="flex xsm:flex-col sm:flex-col l:flex-row gap-x-[10px] gap-y-[10px] xsm:!px-[10px]">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full l:w-[50%]"
          />
          <Link
            href={`/admin/product/lists/${_id}`}
            className="text-[1.6em] xsm:w-full sm:w-full l:w-[50%] text-white text-center font-normal outline-none capitalize px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] border-[1px] border-solid border-[#1b84ff] hover:opacity-80 bg-[#1b84ff] cursor-pointer "
          >
            Update
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LabelAndInput = ({ label, title, styleCustom }: any) => {
  return (
    <div className={`w-[50%] ${styleCustom}`}>
      <LabelInput name={label} styleCustom="!mb-[4px]" />
      <TitleSee title={title} />
    </div>
  );
};

const ModalDelete = (props: any) => {
  const {
    isOpen,
    onClose,
    data,
    setProducts,
    setResultModal,
    setDataLoading,
    setLoadingModal,
    fetchData,
  } = props;
  const color = "#ff6f61";
  const [btnDisabled, setBtnDisabled] = useState(false) as any;

  const handleDeleteProduct = () => {
    setBtnDisabled(true);
    toast.promise(
      fetch(`/api/admin/product?id=${data.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setProducts((prev: any) =>
              prev.filter((item: any) => item._id !== data.id)
            );
            onClose();
            setBtnDisabled(false);
            fetchData();
            return data.message;
          } else {
            throw new Error(data.message);
          }
        }),
      {
        loading: <div className="text-text text-[1.6em]">Deleting...</div>,
        success: (data) => <div className="text-text">{data}</div>,
        error: (data) => <div className="text-text">{data.message}</div>,
      }
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded={"20px"}
        padding={"10px"}
        margin={"auto 15px auto 15px"}
      >
        <ModalHeader>
          <div className="flex justify-center">
            <div className="max-w-[40px] max-h-[40px] relative before:content-[''] before:absolute before:w-[60px] before:h-[60px] before:bg-[#F4D4D7] before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] z-0 before:rounded-[50%] ">
              <svg
                fill="none"
                height="40"
                viewBox="0 0 24 24"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
                className="z-1 relative"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="m12 8v5.5"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="16" fill={color} r="1" />
              </svg>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center">
          <h1 className="text-[2.2em] text-secondary mb-[8px]">
            Delete Product
          </h1>
          <p className="text-text text-[1.6em] text-center capitalize">
            {data.name || null}
          </p>
        </ModalBody>
        <ModalFooter className="flex xsm:flex-col sm:flex-col l:flex-row gap-x-[10px] gap-y-[10px]">
          <ButtonModal
            onClick={onClose}
            title="Cancel"
            styleCustom="border-button bg-white xsm:w-full sm:w-full"
          />
          <ButtonModal
            onClick={handleDeleteProduct}
            title={btnDisabled ? "Deleting" : "Delete"}
            styleCustom="bg-secondary text-white xsm:w-full sm:w-full"
            disabled={btnDisabled}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const TitleSee = ({ title, styleCustom }: any) => {
  return (
    <div className={`text-text text-[1.6em] capitalize ${styleCustom}`}>
      {title}
    </div>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title, disabled } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80 ${
        disabled
          ? "cursor-not-allowed opacity-80"
          : "cursor-pointer opacity-100"
      }`}
      disabled={disabled || false}
    >
      {title}
    </button>
  );
};
export default ListsProduct;
