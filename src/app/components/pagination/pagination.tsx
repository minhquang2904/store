import IconArrowLeft from "../iconArrowLeft/iconArrowLeft";
import IconArrowRight from "../iconArrowRight/iconArrowRight";

const Pagination = (props: any) => {
  const { currentPage, totalPages, onPageChange } = props;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="mt-[30px] flex justify-end items-center">
          <button
            className="p-[10px] rounded-half hover:bg-hover1 cursor-pointer"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IconArrowLeft stroke={currentPage === 1 ? "#ACAAB2" : "#333237"} />
          </button>
          <div className="mx-[6px]">
            <ul className="flex">
              {getPageNumbers().map((number, index) =>
                number === "..." ? (
                  <span
                    key={`${number}-${index}`}
                    className={`mx-[8px] sm:w-[40px] sm:h-[40px] xsm:w-[35px] xsm:h-[35px] rounded-sm text-text xsm:text-[1.6em] sm:text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center`}
                  >
                    ...
                  </span>
                ) : (
                  <Number
                    key={number}
                    number={number}
                    onClick={() => onPageChange(number)}
                    currentPage={currentPage}
                  />
                )
              )}
            </ul>
          </div>
          <button
            className="p-[10px] rounded-half hover:bg-hover1 cursor-pointer"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IconArrowRight
              stroke={currentPage === totalPages ? "#ACAAB2" : "#333237"}
            />
          </button>
        </div>
      )}
    </>
  );
};

const Number = (props: any) => {
  const { number, currentPage, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`hover:bg-button ${
        number === currentPage ? "active" : ""
      } [&.active]:bg-button select-none cursor-pointer [&.active]:text-white hover:text-white mx-[8px] sm:w-[40px] sm:h-[40px] xsm:w-[35px] xsm:h-[35px] rounded-sm text-text xsm:text-[1.6em] sm:text-[1.8em] border-solid border-[1px] border-button font-semibold flex items-center justify-center`}
    >
      {number}
    </div>
  );
};
export default Pagination;
