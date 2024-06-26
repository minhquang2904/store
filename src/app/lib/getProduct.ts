export async function getProduct(productId: string) {
  try {
    const res = await fetch(`/api/product/detail?id=${productId}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
