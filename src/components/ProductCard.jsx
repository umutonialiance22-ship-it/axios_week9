export default function ProductCard({ product, onSelect }) {
  return (
    <button
      onClick={() => onSelect(product.id)}
      className="overflow-hidden rounded-xl bg-white text-left shadow transition hover:shadow-lg"
    >
      <img src={product.thumbnail} alt={product.title} className="aspect-square w-full bg-slate-100 object-cover" />
      <div className="p-4">
        <h3 className="truncate font-medium">{product.title}</h3>
        <p className="text-slate-600">${product.price}</p>
      </div>
    </button>
  )
}