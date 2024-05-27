const ErrorMessage = (props: any) => {
  const { message, styleCustom } = props;
  return (
    <div
      className={`text-secondary font-medium text-[1.6em] mb-[16px] ${styleCustom}`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
