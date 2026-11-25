import { useProduct } from "../features/products/queries"
import { ErrorState } from "./States"

export default function ProductDetails({ id, onClose }) {
  const { data: product, isPending, isError, error, refetch } = useProduct(id)

  if (isPending) {
    return <div className="mt-6 h-48 animate-pulse rounded-xl bg-slate-200" />
  }

  if (isError) {
    return <ErrorState message={error.message} onRetry={refetch} />
  }

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow sm:flex-row">
      <img src={product.thumbnail} alt={product.title} className="h-40 w-40 rounded-lg bg-slate-100 object-cover" />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className="mt-1 text-slate-600">{product.description}</p>
        <p className="mt-2 font-medium">${product.price}</p>
        <button onClick={onClose} className="mt-3 text-sm underline">Close</button>
      </div>
    </div>
  )
}