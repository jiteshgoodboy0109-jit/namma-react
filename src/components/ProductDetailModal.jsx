import { AnimatePresence, motion } from 'framer-motion'
import { X, Sun, ShoppingCart, Minus, Plus, Award, ShieldCheck, Zap } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  if (!isOpen || !product) return null
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const hasPricing = product.mrp && product.price && !String(product.price).includes('Contact')
  const savings =
    product.savings ||
    (hasPricing
      ? `₹${parseInt(String(product.mrp).replace(/[^0-9]/g, '')) - parseInt(String(product.price).replace(/[^0-9]/g, ''))}`
      : null)

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-3 md:inset-8 m-auto z-[100] max-w-7xl h-[88vh] md:h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-slate-900">
              <X size={24} />
            </button>
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
                  <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[560px] pb-2 md:pb-0">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuantity(q => q)}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden shrink-0 transition-all border-slate-200 hover:border-slate-300"
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 relative group">
                    <img src={galleryImages[0]} alt={product.name} className="w-full h-full object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-6">
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">{product.name}</h1>
                    {product.rating && (
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Sun key={i} size={18} fill={i < product.rating ? '#FCD34D' : '#E5E7EB'} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-sm text-slate-500 font-medium">({product.reviewCount || 0} {product.reviewCount === 1 ? 'review' : 'reviews'})</span>
                      </div>
                    )}
                  </div>
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl md:text-5xl font-black text-slate-900">{product.price}</span>
                      {product.mrp && hasPricing && <span className="text-xl text-slate-400 line-through font-bold">{product.mrp}</span>}
                    </div>
                    {savings && hasPricing && (
                      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                        <span className="font-bold text-sm">Save {savings}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-2">Inclusive of all taxes</p>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Quantity:</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-slate-300 rounded-xl overflow-hidden">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-3 hover:bg-slate-100 text-slate-700 transition-colors font-bold">
                          <Minus size={18} />
                        </button>
                        <span className="font-black text-lg w-12 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-3 hover:bg-slate-100 text-slate-700 transition-colors font-bold">
                          <Plus size={18} />
                        </button>
                      </div>
                      {hasPricing && (
                        <div className="text-right">
                          <span className="block text-xs text-slate-500 font-medium">Total</span>
                          <span className="text-2xl font-black text-slate-900">₹{(parseInt(String(product.price).replace(/[^0-9]/g, '')) * quantity).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddToCart} className="bg-green-600 text-white py-4 rounded-xl font-black text-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
                      <ShoppingCart size={22} /> Add to Cart
                    </motion.button>
                  </div>
                  {product.badges && product.badges.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-slate-200">
                      {product.badges.map((badge, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            {i === 0 && <Award className="text-green-600" size={24} />}
                            {i === 1 && <ShieldCheck className="text-green-600" size={24} />}
                            {i === 2 && <Zap className="text-green-600" size={24} />}
                          </div>
                          <span className="text-xs font-bold text-slate-700">{badge}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Product Description</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{product.description}</p>
                  </div>
                  {product.features && product.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Key Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feat, i) => (
                          <span key={i} className="px-3 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Specifications</h3>
                      <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                        <table className="w-full">
                          <tbody>
                            {Object.entries(product.specifications).map(([key, value], i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="px-4 py-3 text-sm font-bold text-slate-700 border-b border-slate-200">{key}</td>
                                <td className="px-4 py-3 text-sm text-slate-600 border-b border-slate-200">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
