import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
const logo = '/log png.png'
export default function Navbar({ scrolled, cartCount, isMenuOpen, setIsMenuOpen, onCartOpen, onNavigate, lang, shopName }) {
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Services', id: 'services' },
    { name: 'Mission', id: 'mission' },
    { name: 'Contact', id: 'contact' }
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center cursor-pointer gap-3" onClick={() => onNavigate('home')}>
            <motion.img
              whileHover={{ rotate: 5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              src={logo}
              alt="Logo"
              className="h-12 md:h-16 w-auto object-contain drop-shadow-md transition-all duration-300"
            />
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`text-2xl md:text-3xl font-black tracking-tight leading-none text-slate-900 ${lang === 'ta' ? 'shopname-tamil' : 'shopname-english'}`}
                >
                  {shopName}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Smart Solutions</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-sm font-bold uppercase tracking-widest relative group transition-colors text-slate-800 hover:text-green-600"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartOpen}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold shadow-xl hover:bg-green-600 transition-all flex items-center gap-2 relative group"
            >
              <ShoppingCart size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm tracking-wide">CART</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={onCartOpen} className="relative p-2 text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
              <ShoppingCart size={26} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 p-2 hover:bg-slate-50 rounded-full transition-colors z-50 relative"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={28} strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={28} strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-28 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-4">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => { onNavigate(item.id); setIsMenuOpen(false) }}
                  className="w-full text-left py-4 text-3xl font-black text-slate-900 border-b-2 border-slate-100 flex items-center justify-between group"
                >
                  <span className="group-hover:text-green-600 transition-colors">{item.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all text-green-600">→</span>
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => { onCartOpen(); setIsMenuOpen(false) }}
                className="w-full mt-8 bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <ShoppingCart size={24} />
                View Cart
                <span className="bg-white text-slate-900 px-3 py-0.5 rounded-full text-sm">{cartCount}</span>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-10 text-center"
            >
              <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Smart Solutions for Smart Living</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
