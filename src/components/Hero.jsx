import { motion } from 'framer-motion'
import { ArrowRight, Zap, Sun, Leaf } from 'lucide-react'

export default function Hero({ onExplore, onContact }) {
  const features = [
    { icon: Sun, label: 'Solar Power', color: 'text-yellow-500' },
    { icon: Zap, label: 'Smart Energy', color: 'text-blue-500' },
    { icon: Leaf, label: 'Eco-Friendly', color: 'text-green-500' }
  ]

  return (
    <section id="home" className="relative min-h-[600px] sm:min-h-[700px] md:h-screen flex items-center overflow-hidden pb-12 sm:pb-16 md:pb-0">
      {/* Optimized animated background - disable animations on mobile for better performance */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 opacity-95"></div>
        <img
          src="https://drive.usercontent.google.com/download?id=1IkDU-xewKTMbNvHxXT4BbLlSEZY_L1DS&authuser=0"
          alt="Modern Solar Home"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
          decoding="async"
        />
        {/* Floating orbs - hidden on mobile for performance */}
        <motion.div className="hidden md:block absolute top-10 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="hidden md:block absolute bottom-10 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="hidden md:block absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" animate={{ x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-start justify-center pt-20 sm:pt-12 md:pt-0 min-h-[600px] sm:min-h-[700px] md:h-screen">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
          {/* Animated badge */}
          <motion.div 
            className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <motion.span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Future of Energy
            </span>
          </motion.div>

          {/* Main headline with gradient - improved for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight sm:leading-[1.1] md:leading-[1.05] tracking-tight">
              Power Your Home With<br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
                Smart Energy
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl leading-relaxed font-medium">
              Transform your home into an intelligent, energy-efficient sanctuary. Cutting-edge renewable energy solutions for your lifestyle.
            </p>
          </motion.div>

          {/* Feature highlights - improved for mobile */}
          <motion.div 
            className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all cursor-default"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <feature.icon size={16} className={`${feature.color} sm:w-5 sm:h-5`} />
                <span className="text-xs sm:text-sm font-bold text-white">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - full width on mobile */}
          <motion.div
            className="flex flex-col w-full sm:flex-row sm:gap-4 space-y-3 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onExplore}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30 transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform hidden sm:block" />
              </span>
              <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContact}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-emerald-400 bg-white/10 text-white font-bold text-sm sm:text-base md:text-lg hover:bg-white/20 transition-all rounded-lg sm:rounded-xl backdrop-blur-sm"
            >
              Contact Experts
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating stats section - only on large screens */}
        <motion.div
          className="hidden lg:block absolute bottom-10 right-10 space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { value: '50K+', label: 'Happy Homes' },
            { value: '99.9%', label: 'Uptime' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg border border-white/20 hover:bg-white/15 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-black text-emerald-400">{stat.value}</div>
              <div className="text-xs text-slate-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
