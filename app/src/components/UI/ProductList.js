import React, { useRef } from 'react'
import ProductCard from './ProductCard'
import '../../styles/product-list.css'

const ProductList = ({ data = [], title, showMoreLink }) => {
    const containerRef = useRef(null)
    const items = data.slice(0, 6) // limit to 6 items per section

    const scrollByWidth = (dir = 1) => {
        const el = containerRef.current
        if (!el) return
        const width = el.clientWidth
        el.scrollBy({ left: dir * width, behavior: 'smooth' })
    }

    return (
        <div className="product-section">
            <div className="product-slider-wrap">
                <button className="slider-btn prev" onClick={() => scrollByWidth(-1)} aria-label="Précédent">‹</button>
                <div className="product-slider" ref={containerRef}>
                    <div className="product-grid">
                        {items.map((item, index) => (
                            <div className="product-grid-item" key={index}>
                                <ProductCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="slider-btn next" onClick={() => scrollByWidth(1)} aria-label="Suivant">›</button>
            </div>

            {showMoreLink && (
                <div className="section-footer">
                    <a href={showMoreLink} className="btn outline">Voir plus</a>
                </div>
            )}
        </div>
    )
}

export default ProductList