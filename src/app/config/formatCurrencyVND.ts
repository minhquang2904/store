function FormatCurrencyVND(amount: any) {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

function MathCeil(amount: any) {
  return Math.ceil(parseFloat(FormatCurrencyVND(amount)));
}

export { FormatCurrencyVND, MathCeil };
