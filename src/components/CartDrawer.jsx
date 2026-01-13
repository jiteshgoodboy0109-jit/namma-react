import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, X, Trash2, MessageCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useState, useRef, useEffect } from 'react'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemove, onCheckout }) {
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })
  const [showForm, setShowForm] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const scrollContainerRef = useRef(null)

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
    return acc + price
  }, 0)

  const OWNER_WHATSAPP_NUMBER = '918883785516'

  // Detect when user scrolls past products
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight
    
    // Show form when user scrolls near bottom
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setShowForm(true)
    }
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!customerInfo.name || !customerInfo.phone) return
    
    // Show invoice preview first
    setShowInvoice(true)
  }

  const handleConfirmOrder = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'] })
    
    // Send to WhatsApp
    const productDetails = cartItems
      .map(item => `• ${item.name} (${item.category})`)
      .join('\n')

    const message = `🛒 *New Order - ${new Date().toLocaleDateString('en-IN')}*

👤 Customer: ${customerInfo.name}
📞 Phone: ${customerInfo.phone}

📦 Products Ordered:
${productDetails}

💰 Total Amount: ₹${totalAmount.toLocaleString()}`.trim()

    const encodedMessage = encodeURIComponent(message)
    const waLink = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(waLink, '_blank')

    // Store customer info and trigger invoice page
    if (onCheckout) {
      onCheckout(customerInfo)
    }
    setCustomerInfo({ name: '', phone: '' })
    setShowForm(false)
    setShowInvoice(false)
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full sm:max-w-md bg-gradient-to-b from-white via-white to-gray-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <motion.div 
              className="p-4 sm:p-6 border-b border-gray-200/50 flex justify-between items-center bg-white sticky top-0 z-10 backdrop-blur-sm bg-white/95"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                  <ShoppingCart className="text-white w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900">Shopping Cart</h2>
                  <p className="text-xs text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <motion.button 
                onClick={onClose} 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-gray-600" />
              </motion.button>
            </motion.div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" ref={scrollContainerRef} onScroll={showInvoice ? undefined : handleScroll}>
              {showInvoice ? (
                // Invoice Preview
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {/* Header Alert */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-green-900 flex items-center gap-2">
                      ✓ Order Review
                    </h3>
                    <p className="text-xs sm:text-sm text-green-700 mt-1">Everything looks good? Confirm to proceed</p>
                  </motion.div>

                  {/* Invoice Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4"
                  >
                    {/* Customer Info - Highlighted */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 space-y-2.5">
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">👤 Customer</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900">{customerInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">📞 Contact</p>
                        <p className="text-sm sm:text-base font-bold text-gray-900">{customerInfo.phone}</p>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">📦 Items</p>
                      <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                        {cartItems.map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className="flex justify-between items-start bg-white p-2.5 rounded-lg border border-gray-100"
                          >
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm font-semibold text-gray-900">{item.name}</p>
                              <p className="text-[10px] text-gray-500">{item.category}</p>
                            </div>
                            <span className="font-bold text-green-600 text-sm sm:text-base">{item.price}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Total - Highlighted */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-white"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">TOTAL AMOUNT</span>
                        <span className="text-2xl sm:text-3xl font-black">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleConfirmOrder}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={17} className="sm:w-5 sm:h-5" /> Confirm & Send
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowInvoice(false)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
                    >
                      ← Back to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ) : cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ShoppingCart size={56} className="sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" strokeWidth={1} />
                  </motion.div>
                  <p className="text-base sm:text-lg font-bold text-gray-700">Cart is empty</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Add some products to get started!</p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      layout
                      initial={{ opacity: 0, y: 20, x: 100 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, x: -200, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="flex gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
                    >
                      {/* Product Image */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative flex-shrink-0"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-gray-100 group-hover:brightness-110 transition-all" 
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors"></div>
                      </motion.div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 leading-tight mb-0.5 text-xs sm:text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-slate-500 mb-1.5 truncate">{item.category}</p>
                        <span className="inline-block bg-green-100 text-green-700 font-bold text-xs sm:text-sm px-2 py-0.5 rounded-full">{item.price}</span>
                      </div>

                      {/* Delete Button */}
                      <motion.button 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onRemove(idx)} 
                        className="flex-shrink-0 text-red-300 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="sm:w-5 sm:h-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            {cartItems.length > 0 && !showInvoice && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showForm ? 1 : 0, y: showForm ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className="p-4 sm:p-5 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200/50 sticky bottom-0 z-10 backdrop-blur-sm"
              >
                {/* Total Summary */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Subtotal</span>
                    <span className="text-lg sm:text-xl font-black text-green-600">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </motion.div>

                {showForm ? (
                  <form onSubmit={handlePlaceOrder} className="space-y-2.5 sm:space-y-3">
                    {/* Name Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="text-xs font-semibold text-gray-600 block mb-1">Your Name *</label>
                      <input
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium text-sm sm:text-base placeholder:text-gray-400"
                        value={customerInfo.name}
                        onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      />
                    </motion.div>

                    {/* Phone Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="text-xs font-semibold text-gray-600 block mb-1">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="10-digit number"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium text-sm sm:text-base placeholder:text-gray-400"
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={!customerInfo.name || !customerInfo.phone}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      <MessageCircle size={17} className="sm:w-5 sm:h-5" /> Review Order
                    </motion.button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-2xl mb-1.5"
                    >
                      👇
                    </motion.div>
                    <p className="text-slate-600 text-xs sm:text-sm font-semibold">Scroll down to enter details</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
