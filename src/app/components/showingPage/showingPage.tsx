import style from "./showingPage.module.scss";

const ShowingPage = (props: any) => {
  return (
    <div className={`${style.titleShowing}`}>
      <h1>Wish Lists</h1>
      <p>Showing 1 - 16 of 72 results</p>
    </div>
  );
};

export default ShowingPage;
