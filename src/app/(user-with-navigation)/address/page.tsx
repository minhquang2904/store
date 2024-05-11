import TitleCheckOut from "@/app/components/titleCheckOut/titleCheckOut";
import Total from "@/app/components/total/total";

const Address = () => {
  return (
    <div className="flex justify-center items-center px-pLayout">
      <div className="w-full max-w-layout l:mt-80 sm:mt-60 xsm:mt-40">
        <TitleCheckOut title="Shipping Address" />
        <div></div>
        <Total />
      </div>
    </div>
  );
};

export default Address;
