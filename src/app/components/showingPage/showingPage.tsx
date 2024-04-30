const ShowingPage = (props: any) => {
  const { title, subTitle } = props;
  return (
    <div>
      <h1 className="text-[3.6em] text-text font-medium">{title}</h1>
      <p className="text-text text-[1.6em]">{subTitle}</p>
    </div>
  );
};

export default ShowingPage;
