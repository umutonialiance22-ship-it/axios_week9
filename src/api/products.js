import { api } from "./client"

export async function fetchProducts({ category = "", limit = 12, skip = 0, signal } = {}) {
  const url = category ? `/products/category/${category}` : "/products"
  const { data } = await api.get(url, { params: { limit, skip }, signal })
  return data
}

export async function fetchProduct(id, { signal } = {}) {
  const { data } = await api.get(`/products/${id}`, { signal })
  return data
}

export async function fetchCategories({ signal } = {}) {
  const { data } = await api.get("/products/category-list", { signal })
  return data
}