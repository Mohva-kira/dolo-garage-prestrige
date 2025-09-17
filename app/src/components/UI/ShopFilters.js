import React, { useState, useEffect } from 'react'

const ShopFilters = ({ categories = [], onChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [category, setCategory] = useState('')

  useEffect(() => {
    onChange({ priceRange, category })
  }, [priceRange, category])

  return (
    <div className="shop-filters bg-white rounded-2xl p-4 shadow-sm">
      <h4 className="text-lg font-semibold mb-3">Filtres</h4>

      <div className="mb-4">
        <label className="text-sm font-medium">Catégorie</label>
        <select className="w-full mt-2 p-2 rounded-lg border" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Toutes</option>
          {categories.map((c) => (
            <option key={c.id} value={c.attributes.name}>{c.attributes.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Prix (max)</label>
        <input type="range" min="0" max="2000" step="10" value={priceRange[1]} onChange={e => setPriceRange([0, Number(e.target.value)])} className="w-full mt-2" />
        <div className="text-sm text-gray-600 mt-1">Jusqu'à: {priceRange[1]} €</div>
      </div>

      <div className="flex space-x-2 mt-3">
        <button className="flex-1 py-2 rounded-lg bg-indigo-600 text-white" onClick={() => { setCategory(''); setPriceRange([0, 2000]) }}>Réinitialiser</button>
      </div>
    </div>
  )
}

export default ShopFilters
