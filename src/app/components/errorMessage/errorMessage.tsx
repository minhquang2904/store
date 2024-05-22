const ErrorMessage = (props: any) => {
  const { message } = props;
  return (
    <div className="text-secondary font-medium text-[1.6em] mb-[16px]">
      {message}
    </div>
  );
};

export default ErrorMessage;
