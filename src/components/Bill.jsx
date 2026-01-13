import { motion } from 'framer-motion'
import { Download, Home } from 'lucide-react'
import { useRef, useEffect } from 'react'
import html2pdf from 'html2pdf.js'

export default function Bill({ cartItems, customerInfo, onCheckoutComplete, onBackHome }) {
  const billRef = useRef(null)
  
  const generateInvoiceNumber = () => {
    return `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  const invoiceNumber = generateInvoiceNumber()
  const invoiceDate = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  })

  // Get customer data from checkout form
  const customer = customerInfo || {
    name: 'Customer Name',
    phone: 'Phone Number'
  }

  // Owner's WhatsApp number - UPDATE THIS WITH REAL NUMBER
  const OWNER_WHATSAPP_NUMBER = '918883785516'  // Change this to owner's actual WhatsApp number

  const companyData = {
    name: 'NAMMA OORU SMART SOLUTIONS',
    tagline: 'Smart Energy Solutions',
    address: 'Bangalore, Karnataka',
    mobile: '+91 8883785516',
    website: 'www.nammaaooru.com'
  }

  // Calculate total (no GST)
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price?.replace('₹', '').replace(/,/g, '') || 0)
    return sum + price
  }, 0)

  // Auto-redirect to WhatsApp on component mount
  useEffect(() => {
    const sendToWhatsApp = () => {
      const productDetails = cartItems
        .map(item => `• ${item.name} (${item.category})`)
        .join('\n')

      const message = `🧾 *New Order Request*

Invoice No: ${invoiceNumber}
Date: ${invoiceDate}

👤 Customer: ${customer.name}
📞 Phone: ${customer.phone}

📦 Products:
${productDetails}

💰 Total Amount: ₹${total.toLocaleString('en-IN')}`.trim()

      const encodedMessage = encodeURIComponent(message)
      const waLink = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodedMessage}`
      window.open(waLink, '_blank')
    }

    // Send to WhatsApp after a short delay
    const timer = setTimeout(() => {
      sendToWhatsApp()
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const downloadPDF = () => {
    const element = billRef.current
    const opt = {
      margin: [5, 5, 5, 5],
      filename: `Invoice-${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    }
    html2pdf().set(opt).from(element).save()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 sm:py-6 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 border-l-4 border-green-600">
            <p className="text-slate-700 font-semibold text-xs sm:text-sm">
              📱 Opening WhatsApp to send your order details...
            </p>
            <p className="text-slate-500 text-[11px] sm:text-xs mt-1">
              Download your invoice below for records.
            </p>
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6"
        >
          <button
            onClick={downloadPDF}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all text-xs sm:text-sm"
          >
            <Download size={16} className="sm:w-4 sm:h-4" /> Download PDF
          </button>
          <button
            onClick={onBackHome}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg shadow-lg transition-all text-xs sm:text-sm"
          >
            <Home size={16} className="sm:w-4 sm:h-4" /> Back Home
          </button>
        </motion.div>

        {/* A4 Sheet Invoice Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '210mm',
            height: 'auto',
            margin: '0 auto',
            aspectRatio: '210 / 297',
            backgroundColor: 'white',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Invoice Content - A4 Formatted */}
          <div
            ref={billRef}
            style={{
              width: '100%',
              height: '100%',
              padding: 'clamp(12px, 3%, 20px)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              fontSize: 'clamp(10px, 2.5vw, 14px)',
              lineHeight: '1.3',
              overflow: 'hidden'
            }}
          >
            {/* Company Header */}
            <div style={{ textAlign: 'center', marginBottom: 'clamp(8px, 2%, 12px)', paddingBottom: 'clamp(8px, 1.5%, 10px)', borderBottom: '2px solid #ccc' }}>
              <h1 style={{ fontSize: 'clamp(12px, 4vw, 16px)', fontWeight: 'bold', margin: '0 0 2px 0' }}>NAMMA OORU SMART SOLUTIONS</h1>
              <p style={{ fontSize: 'clamp(9px, 2vw, 11px)', color: '#666', margin: '0', fontWeight: 'normal' }}>Smart Energy Solutions | www.nammaaooru.com</p>
            </div>

            {/* Invoice Title and Date - Side by Side */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(8px, 2%, 12px)' }}>
              <h2 style={{ fontSize: 'clamp(14px, 4.5vw, 20px)', fontWeight: 'bold', margin: '0' }}>INVOICE</h2>
              <div style={{ textAlign: 'right', fontSize: 'clamp(9px, 2vw, 11px)' }}>
                <p style={{ margin: '0', color: '#666' }}>Invoice No: <strong>{invoiceNumber}</strong></p>
                <p style={{ margin: '2px 0 0 0', color: '#666' }}>Date: <strong>{invoiceDate}</strong></p>
              </div>
            </div>

            {/* Customer Information - Compact */}
            <div style={{ marginBottom: 'clamp(8px, 2%, 10px)', paddingBottom: 'clamp(8px, 1.5%, 10px)', borderBottom: '1px solid #ddd' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: 'clamp(9px, 2vw, 10px)', fontWeight: 'bold' }}>Customer: {customer.name} | Ph: {customer.phone}</p>
            </div>

            {/* Items Table - Compact */}
            <div style={{ flex: 1, marginBottom: 'clamp(8px, 2%, 10px)', overflow: 'auto' }}>
              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', gap: '4px', paddingBottom: '4px', marginBottom: '4px', borderBottom: '1px solid #333', fontWeight: 'bold', fontSize: 'clamp(9px, 2vw, 10px)' }}>
                <div>DESCRIPTION</div>
                <div style={{ textAlign: 'center' }}>QTY</div>
                <div style={{ textAlign: 'right' }}>TOTAL</div>
              </div>

              {/* Table Items */}
              {cartItems.map((item, idx) => {
                const price = parseFloat(item.price?.replace('₹', '').replace(/,/g, '') || 0)
                return (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', gap: '4px', paddingBottom: '3px', marginBottom: '3px', borderBottom: '0.5px solid #ddd', fontSize: 'clamp(8px, 1.8vw, 9px)' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{item.name}</div>
                      <div style={{ fontSize: 'clamp(7px, 1.5vw, 8px)', color: '#666' }}>{item.category}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>1</div>
                    <div style={{ textAlign: 'right', fontWeight: '600' }}>₹{price.toLocaleString('en-IN')}</div>
                  </div>
                )
              })}
            </div>

            {/* Total Section - Highlighted */}
            <div style={{ borderTop: '2px solid #333', paddingTop: 'clamp(6px, 1.5%, 8px)', marginBottom: 'clamp(8px, 2%, 10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '150px', padding: 'clamp(6px, 1.5%, 8px)', backgroundColor: '#f0f0f0', border: '1px solid #999', textAlign: 'center', borderRadius: '4px' }}>
                  <div style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 'bold', margin: '0' }}>TOTAL</div>
                  <div style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 'bold', color: '#1f2937', margin: '2px 0 0 0' }}>₹{total.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Thank You Footer - Compact */}
            <div style={{ textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: 'clamp(6px, 1.5%, 8px)', fontSize: 'clamp(8px, 1.8vw, 9px)' }}>
              <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: 'clamp(10px, 2.5vw, 11px)' }}>Thank You!</p>
              <p style={{ margin: '0', color: '#666' }}>📞 {companyData.mobile} | 🌐 {companyData.website}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
