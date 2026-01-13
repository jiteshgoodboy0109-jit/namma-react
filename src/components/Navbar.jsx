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
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out bg-transparent backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center cursor-pointer gap-3" onClick={() => onNavigate('home')}>
            <motion.img
              whileHover={{ rotate: 5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              src={logo}
              alt="Logo"
              className="h-12 md:h-16 w-auto object-contain drop-shadow-lg transition-all duration-300 hover:drop-shadow-xl"
            />
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`text-2xl md:text-4xl font-black tracking-tight leading-none ${lang === 'ta' ? 'shopname-tamil' : 'shopname-english'}`}
                >
                  {shopName}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-slate-600">Smart Solutions</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-sm font-bold uppercase tracking-widest relative group transition-colors text-slate-900 hover:text-green-600"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartOpen}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-green-500/30 hover:bg-green-500 transition-all flex items-center gap-2 relative border-2 border-green-400"
            >
              <ShoppingCart size={22} strokeWidth={2.5} />
              <span className="font-black">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full border-3 border-white animate-bounce shadow-lg">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={onCartOpen} className="relative p-2 rounded-full text-slate-900">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 p-1">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { onNavigate(item.id); setIsMenuOpen(false) }} className="w-full text-left px-4 py-4 text-lg font-bold rounded-xl border-b border-slate-100 hover:bg-slate-50 text-slate-900">
                  {item.name}
                </button>
              ))}
              <button onClick={() => { onCartOpen(); setIsMenuOpen(false) }} className="w-full mt-4 bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
                <ShoppingCart /> View Cart ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
