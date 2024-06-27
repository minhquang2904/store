export async function getProduct(productId: string) {
  console.log("productId", productId);
  try {
    const res = await fetch(`/api/product/detail?id=${productId}`);
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
