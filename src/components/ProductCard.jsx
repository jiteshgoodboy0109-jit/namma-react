import { motion } from 'framer-motion'

export default function ProductCard({ product, onAddToCart, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
      id={`product-card-${product.id}`}
    >
      <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-lg mb-3 bg-gray-100" loading="lazy" />
      <h4 className="font-bold text-slate-900 leading-tight mb-1">{product.name}</h4>
      <p className="text-xs text-slate-500 mb-2">{product.category}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-green-600">{product.price}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onView(product)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-sm">
          View
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onAddToCart(product)} className="px-3 py-2 rounded-lg bg-green-600 text-white font-bold text-sm">
          Add
        </motion.button>
      </div>
    </motion.div>
  )
}
