import { motion } from 'framer-motion'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <img
            src="https://lh3.googleusercontent.com/d/1tZ9tumY-T-2MnCFSmB8UHVXqCz_Nwd2Y"
            alt="Footer"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-full shadow-lg border-2 border-slate-700"
          />
          <span className="font-bold text-xl sm:text-2xl tracking-tight text-white">Namma Ooru</span>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8 max-w-md mx-auto">Providing quality smart home solutions to empower every household with sustainable energy independence.</p>
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <motion.a whileHover={{ y: -5 }} href="https://www.facebook.com/p/Namma-Ooru-Smart-Solutions-100064102116943/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2.5 sm:p-3 rounded-full text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-md hover:shadow-blue-600/30">
            <Facebook size={18} className="sm:w-5 sm:h-5" />
          </motion.a>
          <motion.a whileHover={{ y: -5 }} href="https://www.instagram.com/namma_ooru_smart_solutions/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2.5 sm:p-3 rounded-full text-slate-400 hover:bg-pink-600 hover:text-white transition-all shadow-md hover:shadow-pink-600/30">
            <Instagram size={18} className="sm:w-5 sm:h-5" />
          </motion.a>
          <motion.a whileHover={{ y: -5 }} href="https://wa.me/918883785516" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2.5 sm:p-3 rounded-full text-slate-400 hover:bg-green-500 hover:text-white transition-all shadow-md hover:shadow-green-500/30">
            <svg viewBox="0 0 24 24" width="18" height="18" className="sm:w-5 sm:h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </motion.a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-slate-500 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
        </div>
        <div className="mt-8 sm:mt-12 text-slate-400 text-[10px] sm:text-xs">© {new Date().getFullYear()} Namma Ooru Smart Solutions. All rights reserved.</div>
      </div>
    </footer>
  )
}
