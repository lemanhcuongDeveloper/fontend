// fetchProducts.js
export async function fetchProducts() {
  const res = await fetch('http://localhost:9000/product-api/getProductLists');
  if (!res.ok) {
      throw new Error('Failed to fetch products');
  }
  return res.json();
}
