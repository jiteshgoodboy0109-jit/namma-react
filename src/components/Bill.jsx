import { motion } from 'framer-motion'
import { Download, Home, Share2 } from 'lucide-react'
import { useRef, useEffect } from 'react'
import html2pdf from 'html2pdf.js'

export default function Bill({ cartItems, customerInfo, onCheckoutComplete, onBackHome }) {
  const billRef = useRef(null)

  const generateInvoiceNumber = () => {
    return `INV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
  }

  const invoiceNumber = generateInvoiceNumber()
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
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
    tagline: 'Smart Energy & Automation',
    address: '', // Address removed as per request
    mobile: '+91 8883785516',
    email: 'contact@nammaooru.com',
    website: 'www.nammaooru.com'
  }

  // Calculate total (no GST for now, can be added)
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price?.replace('₹', '').replace(/,/g, '') || 0)
    return sum + price
  }, 0)

  // Helper to convert number to words (Indian numbering system approximation)
  const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen ']
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

    if ((num = num.toString()).length > 9) return 'overflow'
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)
    if (!n) return ''
    let str = ''
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : ''
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : ''
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : ''
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : ''
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : ''
    return str.trim()
  }

  // Auto-redirect to WhatsApp on component mount
  useEffect(() => {
    const sendToWhatsApp = () => {
      const productDetails = cartItems
        .map(item => `${item.name.padEnd(40, ' ')} ₹${item.price}`)
        .join('\n')

      const amountInWords = numberToWords(total)
      const ownerPhone = companyData.mobile.replace('+91 ', '')

      // Using code block ``` so WhatsApp preserves some spacing/alignment
      // Compact spacing for mobile readability
      const message = `\`\`\`
                 NAMMA OORU SMART SOLUTIONS
           Smart Local Digital Service Partner

Mobile: +91 ${ownerPhone}          Inv: ${invoiceNumber}
                                  Date: ${invoiceDate}
                                  Status: UNPAID

BILL TO                         ISSUED BY
${customer.name.padEnd(28, ' ')}    Namma Ooru Smart Solutions
Ph: ${customer.phone.padEnd(24, ' ')}    Tamil Nadu, India

DESCRIPTION                     AMOUNT
${cartItems.map(item => `${item.name.substring(0, 25).padEnd(28, ' ')} ₹${item.price}`).join('\n')}

TOTAL PAYABLE                   ₹${total.toLocaleString('en-IN')}

Amount in Words:
${amountInWords} Only

For Namma Ooru Smart Solutions

Authorized Signatory
\`\`\``.trim()

      const encodedMessage = encodeURIComponent(message)
      const waLink = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodedMessage}`
      window.open(waLink, '_blank')
    }

    // Send to WhatsApp after a short delay
    const timer = setTimeout(() => {
      sendToWhatsApp()
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const downloadPDF = () => {
    const element = billRef.current
    const opt = {
      margin: [10, 10, 10, 10], // mm
      filename: `Invoice_${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 no-print"
        >
          <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium text-slate-600">Order sent to WhatsApp automatically.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 font-medium text-sm"
            >
              <Download size={18} /> Download invoice
            </button>
            <button
              onClick={onBackHome}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
            >
              <Home size={18} /> Home
            </button>
          </div>
        </motion.div>

        {/* Invoice Paper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-sm overflow-hidden"
          style={{ width: '100%', maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }} // A4 dimensions approximation
        >
          <div ref={billRef} className="p-8 md:p-12 h-full flex flex-col relative">
            {/* Watermark/Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-100 pb-8 mb-8 relative z-10 gap-6 md:gap-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Invoice</h1>
                <p className="text-slate-500 font-medium">#{invoiceNumber}</p>
              </div>
              <div className="text-left md:text-right flex flex-col items-start md:items-end w-full md:w-auto">
                <img src="/log png.png" alt="Logo" className="h-20 w-auto mb-2 object-contain" />
                <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{companyData.name}</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{companyData.tagline}</p>
                <p className="text-sm text-slate-600">Ph: {companyData.mobile}</p>
                <p className="text-sm text-slate-600 text-blue-600 font-bold">{companyData.website}</p>
              </div>
            </header>

            {/* Client & Date Info */}
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
                <h3 className="text-lg font-bold text-slate-900">{customer.name}</h3>
                <p className="text-slate-600 font-medium">{customer.phone}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Invoice Date</p>
                <p className="text-lg font-medium text-slate-900">{invoiceDate}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="flex-1">
              <table className="w-full mb-8">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Item Description</th>
                    <th className="py-3 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-24">Qty</th>
                    <th className="py-3 px-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 px-4">
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </td>
                      <td className="py-4 px-4 text-center text-sm font-medium text-slate-700">1</td>
                      <td className="py-4 px-4 text-right text-sm font-bold text-slate-900">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="border-t-2 border-slate-900 pt-6">
              <div className="flex justify-end">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">Subtotal</span>
                    <span className="text-sm font-bold text-slate-900">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">Tax (0%)</span>
                    <span className="text-sm font-bold text-slate-900">₹0</span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span className="text-lg font-black text-slate-900">Total</span>
                    <span className="text-2xl font-black text-slate-900">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="bg-slate-50 rounded-lg p-4 mt-8 text-center md:text-left">
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Terms & Conditions:</strong> Goods once sold will not be taken back. Warranty as per manufacturer terms.
                This is a computer generated invoice and does not require a physical signature.
              </p>
              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-slate-900">Thank you for your business!</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
