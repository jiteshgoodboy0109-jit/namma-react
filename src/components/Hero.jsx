import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero({ onExplore }) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <picture>
          <source media="(max-width: 768px)" srcSet="/home%20m.jpg" />
          <img
            src="/home%20.jpg"
            alt="Smart Home Energy"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 sm:mb-12 tracking-tight drop-shadow-2xl leading-[1.1]">
            Power Your Home With <br className="hidden md:block" />
            <span className="text-[#4fffa3] drop-shadow-[0_0_15px_rgba(79,255,163,0.4)]">
              Smart Energy
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md hidden md:block">
            Transform your living space with intelligent, sustainable energy solutions designed for the future.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(52, 211, 153, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onExplore}
              className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-slate-900 text-lg md:text-xl font-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 mx-auto overflow-hidden"
            >
              <span className="relative z-10 tracking-wide uppercase">Explore Products</span>
              <ArrowRight size={22} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
