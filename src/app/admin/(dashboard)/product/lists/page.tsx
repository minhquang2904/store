"use client";
import ContentTable from "@/app/components/contentTable/conentTable";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import TitleTable from "@/app/components/titleTable/titleTable";
import { useLayoutEffect, useState } from "react";
import Loading from "@/app/components/loading/loading";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

const ListsProduct = () => {
  const [products, setProducts] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState(null) as any;

  useLayoutEffect(() => {
    setLoading(true);
    try {
      fetch(`/api/admin/product`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const dataReverse = data.data.reverse();
            setLoading(false);
            setProducts(dataReverse);
          } else if (data.status === 400) {
            setLoading(false);
            console.error(data.message);
          }
        });
    } catch (error) {
      console.error("Error in useLayoutEffect: ", error);
    }
  }, []);

  const handleShowModalDelete = (id: any, name: any) => {
    setDataModalDelete({ id, name });
    setModalDelete(true);
  };
  const handleCloseModalDelete = () => setModalDelete(false);
  return (
    <>
      {loading && <Loading />}
      <TitlePageAmin
        title="Product - Lists Product"
        style={{ fontSize: "14px" }}
      />
      <div className="overflow-x-auto">
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
                <tr key={product._id}>
                  <ContentTable title={product.name} />
                  <ContentTable title={product.categories} />
                  <ContentTable title={product.sub_categories} />
                  <ContentTable title={product.quantity} />
                  <ContentTable title={product.price} />
                  <ContentTable title={product.discount} />
                  <ContentTable title={product.discountedPrice} />
                  <td className="font-normal px-[10px] py-[14px] text-text text-[1.6em] text-start capitalize flex gap-x-[14px]">
                    <div className="inline-block cursor-pointer bg-[#FFF3CD] p-[8px] rounded-[12px] hover:opacity-80 duration-200">
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
                    <div className="inline-block cursor-pointer bg-[#CCE5FF] p-[8px] rounded-[12px] hover:opacity-80 duration-200">
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
                    </div>
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
      </div>
      <ModalDelete
        isOpen={modalDelete}
        onClose={handleCloseModalDelete}
        data={dataModalDelete}
      />
    </>
  );
};

const ModalDelete = (props: any) => {
  const { isOpen, onClose, data } = props;
  const color = "#ff6f61";
  const handleDeleteProduct = () => {
    fetch(`/api/admin/product?id=${data.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data.message);
        } else {
          console.error(data.message);
        }
      });
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
            {data.name}
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
            title="Delete"
            styleCustom="bg-secondary text-white xsm:w-full sm:w-full"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ButtonModal = (props: any) => {
  const { styleCustom, onClick, title } = props;
  return (
    <button
      onClick={onClick}
      className={`text-[1.6em] font-normal outline-none capitalize px-[20px] py-[8px] w-[120px] h-[42px] rounded-[12px] ${styleCustom} border-[1px] border-solid hover:opacity-80`}
    >
      {title}
    </button>
  );
};
export default ListsProduct;
