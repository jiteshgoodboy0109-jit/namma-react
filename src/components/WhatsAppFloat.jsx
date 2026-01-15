import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

export default function WhatsAppFloat({ count, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[80] bg-slate-900 text-white p-3 md:p-4 rounded-full shadow-2xl flex items-center justify-center group border-2 border-white/20 hover:border-green-400 transition-colors"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 md:w-7 md:h-7 fill-none group-hover:fill-white/10 transition-colors" strokeWidth={2} />
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-slate-900 shadow-sm"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip style label */}
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        View Cart
      </span>
    </motion.button>
  )
}
