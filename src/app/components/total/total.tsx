const Total = (props: any) => {
  const { title, btn, onClick } = props;
  const checkBtn = btn;
  return (
    <div className="shrink grow-0 l:basis-[30%] l:mt-[10px] xsm:mt-[40px] sm:mt-[40px] l:ml-[80px]">
      <div className="flex justify-between text-[1.6em] mb-[50px]">
        <h1 className="text-text capitalize font-bold">subtotal</h1>
        <h3 className="font-bold text-text">200.00</h3>
      </div>
      <div className="flex justify-between text-[1.6em] mb-[16px]">
        <h1 className="text-text capitalize font-medium">Delivery Change</h1>
        <h3 className="font-medium text-text">5.00</h3>
      </div>
      <div className="flex justify-between text-[1.6em] mb-[16px]">
        <h1 className="text-text capitalize font-bold">Grand Total</h1>
        <h3 className="font-bold text-text">205.00</h3>
      </div>
      {checkBtn && (
        <div>
          <button
            className="mt-[10px] text-[1.4em] text-white bg-button w-full p-[14px] rounded-[10px] hover:opacity-90"
            onClick={onClick}
          >
            {title}
          </button>
        </div>
      )}
    </div>
  );
};

export default Total;
