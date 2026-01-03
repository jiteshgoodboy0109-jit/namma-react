import { Phone, MapPin, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle.jsx'
import ContactForm from './ContactForm.jsx'

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle title="Contact Us" />
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 flex flex-col lg:flex-row bg-white">
          <div className="bg-slate-50 text-slate-900 p-10 lg:w-2/5 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8">Visit Showroom</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><Phone className="text-green-600" /></div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Call Us</div>
                    <a href="tel:+918883785516" className="font-bold text-xl tracking-tight hover:text-green-600 transition-colors">+91 88837 85516</a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><MapPin className="text-green-600" /></div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Location</div>
                    <div className="font-bold text-lg leading-snug">123, Gandhi Road,<br />Udumalaipettai, TN</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 h-48 w-full rounded-2xl overflow-hidden bg-slate-100 relative z-10 border border-slate-200 shadow-inner">
              <iframe src="https://maps.google.com/maps?q=Namma%20Ooru%20Smart%20Solutions%2C%20Udumalpet&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Map"> </iframe>
            </div>
          </div>
          <div className="p-8 md:p-12 lg:w-3/5 bg-white">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
