import { motion } from 'framer-motion'
import { Sun, Zap, Battery, Camera, Droplets, Leaf, Wrench } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'

const SERVICES = [
  { title: 'Solar projects and hybrid solar', icon: <Sun className="w-6 h-6 text-yellow-500" />, desc: 'Complete solar solutions for grid-independence.', targetProduct: 'hybrid-solar' },
  { title: 'Heat pumps', icon: <Zap className="w-6 h-6 text-orange-500" />, desc: 'Efficient water heating for all seasons.', targetProduct: 'heat-pump' },
  { title: 'Solar water heater', icon: <Sun className="w-6 h-6 text-red-500" />, desc: 'Save electricity with solar hot water.', targetProduct: 'solar-heater' },
  { title: 'Inverter battery', icon: <Battery className="w-6 h-6 text-blue-500" />, desc: 'Long-lasting backups for your home.', targetProduct: 'inverter-battery' },
  { title: 'CCTV camera', icon: <Camera className="w-6 h-6 text-slate-700" />, desc: 'Secure your premises with HD surveillance.', targetProduct: 'cctv-system' },
  { title: 'Water purifier', icon: <Droplets className="w-6 h-6 text-cyan-500" />, desc: 'Pure & safe drinking water solutions.', targetProduct: 'water-purifier' },
  { title: 'Water softener', icon: <Leaf className="w-6 h-6 text-teal-500" />, desc: 'Treat hard water for better health.', targetProduct: 'water-softener' },
  { title: 'Robotic vacuum cleaner', icon: <Wrench className="w-6 h-6 text-indigo-500" />, desc: 'Smart cleaning for modern homes.', targetProduct: 'robotic-vacuum' }
]

export default function Services({ onScrollToProduct }) {
  return (
    <section id="services" className="py-12 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle title="Complete Smart Solutions" subtitle="End-to-end installation & maintenance." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02, x: 5 }}
              onClick={() => onScrollToProduct(service.targetProduct)}
              className="flex items-center p-4 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-green-100 cursor-pointer transition-all gap-3"
            >
              <div className="p-2 rounded-lg bg-green-50 text-green-600 shrink-0">{service.icon}</div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{service.title}</h4>
                <p className="text-xs text-slate-500 truncate">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
