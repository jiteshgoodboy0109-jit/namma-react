export default function BrandsStrip() {
  return (
    <div className="bg-slate-900 py-10 overflow-hidden">
      <div className="max-w-full">
        <div className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Authorized Dealers</div>
        <div className="overflow-hidden w-full">
          <marquee scrollamount="5" className="text-white font-bold text-lg md:text-2xl opacity-60">
            <span className="mx-12">Aquaguard</span>
            <span className="mx-12">LUMINOUS</span>
            <span className="mx-12">V-Guard</span>
            <span className="mx-12">Havells</span>
            <span className="mx-12">Microtek</span>
            <span className="mx-12">Exide</span>
            <span className="mx-12">Amaron</span>
            <span className="mx-12">Su-Kam</span>
            <span className="mx-12">Livguard</span>
          </marquee>
        </div>
      </div>
    </div>
  )
}
