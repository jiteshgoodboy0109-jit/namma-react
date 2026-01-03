import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, X, Trash2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useState } from 'react'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemove }) {
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
    return acc + price
  }, 0)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'] })
    let message = `*New Order Request*\n\n`
    message += `*Name:* ${customerInfo.name}\n`
    message += `*Phone:* ${customerInfo.phone}\n\n`
    message += `*Items:*\n`
    cartItems.forEach(item => { message += `- ${item.name} (${item.price})\n` })
    message += `\n*Total Amount:* ₹${totalAmount.toLocaleString()}`
    const phoneNumber = '918883785516'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
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
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <ShoppingCart className="text-green-600" strokeWidth={2.5} /> Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                  <ShoppingCart size={64} strokeWidth={1.5} className="mb-4 text-slate-300" />
                  <p className="text-lg font-bold">Your cart is empty</p>
                  <p className="text-sm">Add items to get started!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" loading="lazy" />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 leading-tight mb-1">{item.name}</h4>
                        <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-green-600">{item.price}</span>
                          <button onClick={() => onRemove(idx)} className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-bold">Total Amount</span>
                  <span className="text-base md:text-2xl font-black text-slate-900">₹{totalAmount.toLocaleString()}</span>
                </div>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <input
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium text-base"
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium text-base"
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Place Order via WhatsApp
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
