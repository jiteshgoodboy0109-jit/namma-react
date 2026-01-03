import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'

export default function Mission() {
  return (
    <section id="mission" className="py-12 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <SectionTitle title="Our Core Values" subtitle="Driving the transition to a sustainable future." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
              <Target size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To pioneer energy transformation by developing accessible, reliable, and scalable renewable energy solutions for every household.
            </p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-slate-900/20 flex flex-col items-center text-center text-white relative overflow-hidden">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 text-yellow-400">
              <Eye size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black mb-4">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed">
              To empower every community with sustainable energy independence and create a greener, cleaner planet for future generations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
