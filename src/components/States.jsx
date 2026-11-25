export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-white shadow" aria-hidden="true">
      <div className="aspect-square bg-slate-200" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-200" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading products…</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-3xl" aria-hidden="true">⚠️</p>
      <h2 className="mt-2 font-semibold text-red-900">Something went wrong</h2>
      <p className="mt-1 text-sm text-red-800">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="mx-auto max-w-sm py-12 text-center">
      <p className="text-4xl" aria-hidden="true">🛒</p>
      <h2 className="mt-3 text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 text-slate-600">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}