import { useEffect, useState, createContext, useContext } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import SectionTitle from './components/SectionTitle.jsx'
import Services from './components/Services.jsx'
import Mission from './components/Mission.jsx'
import TrustStats from './components/TrustStats.jsx'
import BrandsStrip from './components/BrandsStrip.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import Bill from './components/Bill.jsx'
import { products as PRODUCTS } from './data/products.js'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

const ToastContext = createContext()
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[70] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border pointer-events-auto ${toast.type === 'success' ? 'bg-slate-900/90 text-white border-green-500/50' : 'bg-red-900/90 text-white border-red-500/50'
                }`}
            >
              <span className="font-bold text-sm">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
export const useToast = () => useContext(ToastContext)

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filterCategory, setFilterCategory] = useState('All')
  const [showBillPage, setShowBillPage] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)
  const [lang, setLang] = useState('en')
  const [shopName, setShopName] = useState('NAMMA OORU')
  const { addToast } = useToast()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    const interval = setInterval(() => setLang((p) => (p === 'en' ? 'ta' : 'en')), 2000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    setShopName(lang === 'en' ? 'NAMMA OORU' : 'நம்ம ஊரு')
  }, [lang])

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
    addToast(`${product.name} added to cart!`)
  }
  const removeFromCart = (index) => {
    setCart((prev) => {
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
  }
  const handleCheckout = (customerInfo) => {
    // Store customer info and show bill page
    setCustomerInfo(customerInfo)
    setShowBillPage(true)
    addToast('Proceeding to invoice...', 'success')
  }
  const handleBackHome = () => {
    setShowBillPage(false)
    setCart([])
    setCustomerInfo(null)
    scrollToSection('home')
  }
  const openProduct = (product) => setSelectedProduct(product)
  const scrollToSection = (id) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
    }
  }
  const scrollToProduct = (productId) => {
    scrollToSection('products')
    setTimeout(() => {
      const card = document.getElementById(`product-card-${productId}`)
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
        card.classList.add('ring-4', 'ring-green-500')
        setTimeout(() => card.classList.remove('ring-4', 'ring-green-500'), 2000)
      }
    }, 600)
  }
  const onNavigate = (id) => scrollToSection(id)
  const filteredProducts = filterCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filterCategory)

  // Show Bill page if checkout completed
  if (showBillPage && cart.length > 0) {
    return (
      <ToastProvider>
        <Bill cartItems={cart} customerInfo={customerInfo} onCheckoutComplete={handleCheckout} onBackHome={handleBackHome} />
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white font-sans overflow-x-hidden text-slate-900">
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />
        <Navbar
          scrolled={scrolled}
          cartCount={cart.length}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          onCartOpen={() => setIsCartOpen(true)}
          onNavigate={onNavigate}
          lang={lang}
          shopName={shopName}
        />
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
        <Hero onExplore={() => onNavigate('products')} onContact={() => onNavigate('contact')} />
        <TrustStats />
        <section id="products" className="max-w-7xl mx-auto px-6 py-12">
          <SectionTitle title="Product Catalogue" subtitle="Our premium selection of smart home essentials." />
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {['All', 'Home Inverters', 'High Capacity Inverters', 'Solar On-Grid', 'Solar Off-Grid', 'Batteries', 'Combo Kits', 'Water Purifiers', 'Robotic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 border ${filterCategory === cat ? 'bg-slate-900 text-white shadow-lg scale-105 border-slate-900' : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.05 }}
                whileHover={{ y: -5 }}
                id={`product-card-${product.id}`}
                onClick={() => openProduct(product)}
                className="group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-square relative bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-2 md:p-6 flex flex-col flex-1">
                  <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2 text-slate-900 leading-tight">{product.name}</h3>
                  <div className="hidden md:flex flex-wrap gap-2 mb-3">
                    {product.features && product.features.map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] uppercase font-bold tracking-wider rounded-md">{feature}</span>
                    ))}
                  </div>
                  <p className="hidden md:block text-sm text-slate-500 mb-6 leading-relaxed flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-2 md:pt-6 border-t border-gray-100">
                    <span className="text-sm md:text-2xl font-black text-slate-900">{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                      className="bg-slate-900 text-white p-1.5 md:p-3 rounded-lg md:rounded-xl shadow-lg hover:bg-green-600 transition-colors"
                    >
                      <Plus size={14} className="md:w-6 md:h-6" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <Services onScrollToProduct={scrollToProduct} />
        <Mission />
        <BrandsStrip />
        <ContactSection />
        <Footer />
        <WhatsAppFloat count={cart.length} onClick={() => setIsCartOpen(true)} />
      </div>
    </ToastProvider>
  )
}
