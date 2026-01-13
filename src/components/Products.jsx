import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'

const PRODUCTS = [
	{
		id: 1,
		name: 'Solar Panel 550W',
		category: 'Solar',
		price: '₹18,000',
		capacity: '550W',
		rating: 4.8,
		image: 'https://via.placeholder.com/300x300?text=Solar+Panel',
	},
	{
		id: 2,
		name: 'Inverter 3kW',
		category: 'Inverters',
		price: '₹45,000',
		capacity: '3kW',
		rating: 4.9,
		image: 'https://via.placeholder.com/300x300?text=Inverter',
	},
	{
		id: 3,
		name: 'Battery 5kWh',
		category: 'Batteries',
		price: '₹3,50,000',
		capacity: '5kWh',
		rating: 4.7,
		image: 'https://via.placeholder.com/300x300?text=Battery',
	},
	{
		id: 4,
		name: 'Solar Combo Kit',
		category: 'Combo',
		price: '₹5,50,000',
		capacity: '10kW',
		rating: 4.9,
		image: 'https://via.placeholder.com/300x300?text=Combo+Kit',
	},
	{
		id: 5,
		name: 'Water Purifier RO',
		category: 'Purifiers',
		price: '₹15,000',
		capacity: '10L',
		rating: 4.6,
		image: 'https://via.placeholder.com/300x300?text=RO+Purifier',
	},
	{
		id: 6,
		name: 'Smart Home Kit',
		category: 'Smart',
		price: '₹25,000',
		capacity: 'Full Home',
		rating: 4.8,
		image: 'https://via.placeholder.com/300x300?text=Smart+Kit',
	},
]

export default function Products({ onAddToCart }) {
	const [filter, setFilter] = useState('All')
	const categories = [
		'All',
		'Solar',
		'Inverters',
		'Batteries',
		'Combo',
		'Purifiers',
		'Smart',
	]
	const filtered =
		filter === 'All'
			? PRODUCTS
			: PRODUCTS.filter(p => p.category === filter)

	return (
		<section className="py-20 px-4 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
						Our Products
					</h2>
					<p className="text-xl text-slate-600">
						Premium solar & smart home solutions
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					className="flex gap-2 mb-12 justify-center flex-wrap"
				>
					{categories.map(cat => (
						<motion.button
							key={cat}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setFilter(cat)}
							className={`px-6 py-2 rounded-full font-bold transition-all ${
								filter === cat
									? 'bg-emerald-600 text-white shadow-lg'
									: 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-600'
							}`}
						>
							{cat}
						</motion.button>
					))}
				</motion.div>
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{filtered.map((product, idx) => (
						<motion.div
							key={product.id}
							layout
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ delay: idx * 0.1 }}
							whileHover={{ y: -8 }}
							className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
						>
							<div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-blue-100">
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
								/>
								<div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
									New
								</div>
							</div>
							<div className="p-6">
								<h3 className="font-bold text-xl mb-2 text-slate-900">
									{product.name}
								</h3>
								<p className="text-sm text-slate-600 mb-3">
									{product.capacity}
								</p>
								<div className="flex items-center gap-2 mb-4">
									<div className="flex">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={16}
												className={
													i < Math.floor(product.rating)
														? 'text-yellow-400 fill-yellow-400'
														: 'text-gray-300'
												}
											/>
										))}
									</div>
									<span className="text-sm text-slate-600">
										({product.rating})
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-emerald-600">
										{product.price}
									</span>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => onAddToCart(product)}
										className="bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-500 transition-colors"
									>
										<ShoppingCart size={20} />
									</motion.button>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}