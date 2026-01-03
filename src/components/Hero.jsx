import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero({ onExplore, onContact }) {
  return (
    <section id="home" className="relative min-h-[650px] md:h-screen flex items-center md:overflow-hidden overflow-visible pb-16 md:pb-0 content-auto">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          src="https://drive.usercontent.google.com/download?id=1IkDU-xewKTMbNvHxXT4BbLlSEZY_L1DS&authuser=0"
          alt="Modern Solar Home"
          className="w-full h-full object-cover opacity-60 will-change-transform"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-12 flex flex-col items-start pt-12 md:pt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-slate-900 border border-slate-200 text-[11px] md:text-xs font-bold uppercase tracking-widest">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Future of Energy
              </span>
            </div>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-5 leading-[1.08] tracking-tight">
              A Beautiful Life Begins With a <br /><span className="text-red-600">Peaceful Home</span>
            </h1>
            <div className="flex flex-col sm:flex-row sm:gap-5 w-full sm:w-auto space-y-3 sm:space-y-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExplore}
                className="group relative w-full sm:w-auto justify-center px-6 py-3 bg-slate-900 text-white font-bold text-base md:text-lg rounded-xl overflow-hidden shadow-lg will-change-transform"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContact}
                className="w-full sm:w-auto justify-center px-6 py-3 border-2 border-slate-300 bg-white text-slate-900 font-bold text-base md:text-lg hover:bg-slate-100 transition-colors rounded-xl will-change-transform"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
