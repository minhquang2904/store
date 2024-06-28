export async function getProduct(productId: string, setLoadingProducts: any) {
  try {
    const res = await fetch(`/api/product/detail?id=${productId}`);
    const result = await res.json();

    setLoadingProducts(false);
    return result;
  } catch (error) {
    console.log(error);
  }
}
