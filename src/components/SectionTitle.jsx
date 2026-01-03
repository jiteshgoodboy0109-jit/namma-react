import { motion } from 'framer-motion'

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10 md:mb-16 relative px-4">
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">
        {title}
      </motion.h2>
      <div className="w-16 md:w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mb-4 md:mb-6"></div>
      {subtitle && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-medium">
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
