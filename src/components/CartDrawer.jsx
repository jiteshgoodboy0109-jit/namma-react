import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, X, Trash2, ArrowRight, ShieldCheck, CheckCircle, Sparkles, MessageCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useState, useRef } from 'react'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemove, onCheckout }) {
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
    return acc + price
  }, 0)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!customerInfo.name || !customerInfo.phone) return

    // Trigger success state
    setOrderPlaced(true)

    // Confetti effect
    const duration = 3000
    const end = Date.now() + duration
    const colors = ['#10B981', '#3B82F6', '#F59E0B']

      ; (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()

    // Pass data to parent after delay
    setTimeout(() => {
      if (onCheckout) {
        onCheckout(customerInfo)
      }
      setOrderPlaced(false)
      setCustomerInfo({ name: '', phone: '' })
      onClose()
    }, 2500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full sm:max-w-[450px] bg-gray-50 flex flex-col h-[100dvh] shadow-2xl"
          >
            {/* Header - Matching Green Style */}
            <div className="px-6 py-5 bg-white border-b border-gray-100 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                  <ShoppingCart size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-none">Shopping Cart</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">{cartItems.length} items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
              {/* Success Overlay */}
              <AnimatePresence>
                {orderPlaced && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg"
                    >
                      <CheckCircle size={48} strokeWidth={3} />
                    </motion.div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed!</h3>
                    <p className="text-slate-500 font-medium">Redirecting to your invoice...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                  <ShoppingCart size={64} className="mb-4 text-slate-300" strokeWidth={1} />
                  <p className="text-lg font-bold text-slate-900">Your cart is empty</p>
                  <p className="text-sm text-slate-500">Looks like you haven't added anything yet.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex gap-4"
                    >
                      <div className="h-20 w-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div className="pr-2">
                            <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{item.name}</h4>
                            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{item.category}</p>
                          </div>
                          <button onClick={() => onRemove(idx)} className="text-red-300 hover:text-red-500 transition-colors">
                            <Trash2 size={18} strokeWidth={2} />
                          </button>
                        </div>

                        <div className="mt-2">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {!String(item.price).startsWith('₹') ? '₹' : ''}{item.price}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer - Always Visible Form - Matching Screenshot */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-gray-100 p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-10 flex-shrink-0">
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  {/* Subtotal Row */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center mb-4">
                    <span className="text-slate-600 font-bold text-sm">Subtotal</span>
                    <span className="text-xl font-black text-green-600">₹{totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Your Name *</label>
                      <input
                        required
                        value={customerInfo.name}
                        onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-green-500 transition-all text-sm placeholder:text-slate-300"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-green-500 transition-all text-sm placeholder:text-slate-300"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!customerInfo.name || !customerInfo.phone}
                    className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-95"
                  >
                    <MessageCircle size={20} /> Review Order
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
