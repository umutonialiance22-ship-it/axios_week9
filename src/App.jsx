import { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useCategories, useProducts } from "./features/products/queries"
import ProductCard from "./components/ProductCard"
import ProductDetails from "./components/ProductDetails"
import { EmptyState, ErrorState, ProductGridSkeleton } from "./components/States"

const PAGE_SIZE = 12

function AppFallback({ resetErrorBoundary }) {
  return (
    <div role="alert" className="p-8 text-center">
      <p className="font-medium">Something went wrong.</p>
      <button onClick={resetErrorBoundary} className="mt-2 underline">Reload section</button>
    </div>
  )
}

function Shop() {
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState(null)

  const categories = useCategories()
  const { data, isPending, isError, error, isFetching, refetch } = useProducts({
    category,
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  })

  function handleCategoryChange(e) {
    setCategory(e.target.value)
    setPage(1)
  }

  function clearFilters() {
    setCategory("")
    setPage(1)
  }

  function renderProducts() {
    if (isPending) return <ProductGridSkeleton count={PAGE_SIZE} />

    if (isError && !data) {
      return <ErrorState message={error.message} onRetry={refetch} />
    }

    if (data.products.length === 0) {
      return (
        <EmptyState
          title="No products found"
          description="Try a different category."
          action={
            <button onClick={clearFilters} className="rounded-lg border px-4 py-2 text-sm">
              Clear filters
            </button>
          }
        />
      )
    }

    return (
      <div
        aria-busy={isFetching}
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-opacity ${isFetching ? "opacity-60" : ""}`}
      >
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={setSelectedId} />
        ))}
      </div>
    )
  }

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Mini Shop</h1>
        <div className="flex items-center gap-3">
          {isFetching && <span className="text-sm text-slate-500">Refreshing…</span>}
          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-lg border bg-white px-3 py-2"
          >
            <option value="">All categories</option>
            {categories.data?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </header>

      {renderProducts()}

      {data && data.total > PAGE_SIZE && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {selectedId && <ProductDetails id={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <Shop />
    </ErrorBoundary>
  )
}