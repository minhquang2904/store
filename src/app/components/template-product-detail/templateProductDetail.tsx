import style from "./templateProductDetail.module.scss";

export default function TemplateProductDetail() {
  return (
    <div className={`${style.detail}`}>
      <div className={`${style.detailContainer}`}>
        <div className={`${style.detailPageNavigation}`}></div>
        <div className={`${style.detailBuy}`}>
          <div className={`${style.detailBuyLeft}`}>
            <div className={`${style.detailBuyLeftImage}`}></div>
            <div className={`${style.detailBuyLeftImageReview}`}></div>
          </div>
          <div className={`${style.detailBuyRight}`}>
            <div className={`${style.detailBuyRightTitle}`}></div>
            <div className={`${style.detailBuyRightType}`}></div>
            <div className={`${style.detailBuyRightPrice}`}></div>
            <div className={`${style.detailBuyRightDescription}`}></div>
            <div className={`${style.detailBuyRightColor}`}></div>
            <div className={`${style.detailBuyRightSize}`}></div>
            <div className={`${style.detailBuyRightAddToCard}`}>
              <div className={`${style.detailBuyRightAddToCardNumber}`}></div>
              <div className={`${style.detailBuyRightAddToCardBtn}`}></div>
              <div className={`${style.detailBuyRightAddToCardHeart}`}></div>
            </div>
          </div>
        </div>
        <div className={`${style.detailDescription}`}>
          <div className={`${style.detailDescriptionNavigation}`}></div>
          <div className={`${style.detailDescriptionContent}`}></div>
        </div>
      </div>
    </div>
  );
}
