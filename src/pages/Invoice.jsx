import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, Share2, ArrowLeft } from 'lucide-react'

const LOGO = encodeURI('/log png.png')

function formatCurrency(v) {
  return Number(v || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })
}

export default function Invoice() {
  const navigate = useNavigate()
  const stored = localStorage.getItem('checkoutInvoice')
  const invoice = stored ? JSON.parse(stored) : null

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Invoice Found</h2>
          <button onClick={() => navigate('/')} className="bg-emerald-600 text-white px-6 py-3 rounded-lg">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const subtotal = useMemo(() => invoice.items.reduce((s, it) => s + (it.price * it.qty), 0), [invoice.items])
  const tax = useMemo(() => (subtotal * invoice.taxPercent) / 100, [subtotal, invoice.taxPercent])
  const total = subtotal + tax

  const handleWhatsApp = () => {
    const lines = [
      `🧾 *Namma Oooru Smart*`,
      `Invoice: ${invoice.number}`,
      `Date: ${invoice.date}`,
      ``,
      `👤 Customer: ${invoice.customer.name}`,
      `📞 Phone: ${invoice.customer.mobile}`,
      ``,
      `📦 Products:`
    ]
    
    invoice.items.forEach(it => {
      lines.push(`• ${it.name} (${it.capacity})`)
      lines.push(`  Qty: ${it.qty}, Price: ₹${formatCurrency(it.price)}, Total: ₹${formatCurrency(it.price * it.qty)}`)
    })

    lines.push(``)
    lines.push(`💰 Total: ₹${formatCurrency(total)}`)
    lines.push(``)
    lines.push(`Thank you! ☀️`)

    const msg = encodeURIComponent(lines.join('\n'))
    const wa = invoice.ownerWhatsApp || '919876543210'
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        
        <div className="flex gap-3 mb-8">
          <button onClick={handleWhatsApp} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-500">
            <Share2 size={20} /> WhatsApp
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 border px-6 py-3 rounded-lg font-bold hover:bg-gray-50">
            <ArrowLeft size={20} /> Home
          </button>
        </div>

        <div className="border-b pb-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="logo" className="h-16 w-16 object-contain rounded-full bg-gray-100 p-2" />
            <div>
              <h1 className="text-2xl font-bold">Namma Oooru Smart</h1>
              <p className="text-gray-600">Solar Energy Solutions</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">INVOICE</p>
            <p className="text-2xl font-bold">{invoice.number}</p>
            <p className="text-gray-600">{invoice.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-2">BILL TO</p>
            <p className="font-bold text-lg">{invoice.customer.name}</p>
            <p className="text-gray-700">{invoice.customer.address}</p>
            <p className="text-gray-700">📞 {invoice.customer.mobile}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left font-bold">Product</th>
              <th className="p-3 text-right font-bold">Qty</th>
              <th className="p-3 text-right font-bold">Price</th>
              <th className="p-3 text-right font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{it.name} ({it.capacity})</td>
                <td className="p-3 text-right">{it.qty}</td>
                <td className="p-3 text-right">₹{formatCurrency(it.price)}</td>
                <td className="p-3 text-right font-bold">₹{formatCurrency(it.price * it.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="max-w-xs ml-auto mb-8">
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-600 pb-3 border-b">
            <span>GST (18%)</span>
            <span>₹{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-emerald-600">₹{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded text-sm text-gray-700">
          <p className="font-bold mb-2">Thank you for your order!</p>
          <p>Warranty: 2 years on major components</p>
          <p>Contact: 919876543210</p>
        </div>
      </div>
    </div>
  )
}