import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchProducts, fetchProduct, fetchCategories } from "../../api/products"

export const productKeys = {
  all: ["products"],
  list: (filters) => ["products", "list", filters],
  detail: (id) => ["products", "detail", id],
}

export function useProducts(filters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: ({ signal }) => fetchProducts({ ...filters, signal }),
    placeholderData: keepPreviousData,
  })
}

export function useProduct(id) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => fetchProduct(id, { signal }),
    enabled: id != null,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
  })
}