import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/8883785516"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[80] bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-5 rounded-2xl shadow-2xl flex items-center gap-3 group border-2 border-white/20"
    >
      <div className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-30"></div>
      <div className="relative">
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-white stroke-white drop-shadow-lg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </div>
      <span className="hidden md:block relative text-sm font-black tracking-wide">
        Chat Now
      </span>
      <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-slate-200">
        💬 Need Help? Chat with us!
      </span>
    </motion.a>
  )
}
