import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CheckCircle, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const fireConfettiSequence = () => {
    const defaults = { origin: { y: 0.7 } }
    confetti({ ...defaults, particleCount: 100, spread: 70, startVelocity: 40, colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'] })
    setTimeout(() => confetti({ ...defaults, particleCount: 80, spread: 90, startVelocity: 35, colors: ['#22C55E', '#60A5FA', '#FCD34D', '#F472B6'] }), 250)
    setTimeout(() => confetti({ ...defaults, particleCount: 120, spread: 60, startVelocity: 30, colors: ['#2DD4BF', '#A78BFA', '#FB7185', '#84CC16'] }), 600)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')

    // Format message for WhatsApp
    const message = `👋 *New Inquiry from Website*

👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📝 *Project Details:*
${formData.message}

Please reply to this inquiry.`.trim()

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/918883785516?text=${encodedMessage}`

    // Small delay to show loading state then redirect
    setTimeout(() => {
      setStatus('success')
      fireConfettiSequence()
      window.open(whatsappUrl, '_blank')
      setFormData({ name: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 1000)
  }

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white z-20 rounded-2xl overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-inner">
                <CheckCircle size={44} strokeWidth={2.5} />
              </div>
            </motion.div>
            <motion.h3
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-3xl font-black text-slate-900 mb-2"
            >
              Opening WhatsApp...
            </motion.h3>
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="text-slate-500 max-w-xs mx-auto"
            >
              Redirecting you to chat with our experts directly.
            </motion.p>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
              className="h-1.5 rounded-full bg-gradient-to-r from-green-500 via-teal-400 to-emerald-500 mt-4"
            />
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 w-full"
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 text-base focus:ring-0 focus:border-green-500 outline-none transition-all duration-300 font-medium bg-gray-50"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 text-base focus:ring-0 focus:border-green-500 outline-none transition-all duration-300 font-medium bg-gray-50"
                  placeholder="+91 Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">How can we help?</label>
              <textarea
                required
                rows={4}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 text-base focus:ring-0 focus:border-green-500 outline-none transition-all duration-300 font-medium bg-gray-50"
                placeholder="I am interested in..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-green-500/20 transition-all ${status === 'loading' ? 'bg-slate-400' : 'bg-gradient-to-r from-green-600 to-teal-500 hover:to-green-500'}`}
            >
              {status === 'loading' ? 'Processing...' : 'Send via WhatsApp'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
