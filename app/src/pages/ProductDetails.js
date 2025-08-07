import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router'
// import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-details.css'
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../reducers/cartSlice'
import { toast } from 'react-toastify'
import { current } from '@reduxjs/toolkit'
import util from '../util'
const ProductDetails = () => {

  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch = useDispatch()

  
  const dataImages = useSelector((state) => state.products.items.included)
  const [rating, setRating] = useState(null)
  const { id } = useParams()
  const products = useSelector(state => state.products.items.data)
  const product = products.find(item => item.id == id)

  const WS_KEY = 'ws_key=X62XX13PRJYYZQP7FZR663UK4S29D4A9'
  
   const { attributes, reviews, description, category } = product



  const relatedProducts = products.filter(item => item.attributes.category.data.attributes.name === 'consommable')

  const submitHandler= (e) => {
    e.preventDefault()
    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

     const reviewObj = {
      author: reviewUserName,
      text : reviewUserMsg,
      rating
     }
     console.log(reviewObj)
     toast.success('Review submitted')
  }

  const addToCart = () => {
  
    dispatch(cartActions.addItem({
      id,
      imgID: attributes?.image.data[0].attributes.url,
      producName: attributes.name,
      price: attributes.price, 
      type: category?.data?.attributes?.name,
    }))

    toast.success('Produit ajouté avec succès au panier')
  }


  useEffect(()=> {
    window.scrollTo(0,0)
  }, [product])

  return <Helmet title={attributes.name}>
    <CommonSection title={attributes.name} />
    {console.log('le produit',product)}
    <section className='pt-0'>
    <Container>
      <Row className="g-4">
        {/* Image Section */}
        <Col lg='6'>
          <div className="product-detail-image mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-4 shadow-lg h-96 d-flex align-items-center justify-content-center position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
            <img 
              src={`http://localhost:1337${attributes.image.data[0].attributes.url}`} 
              className='w-100 h-100 object-contain position-relative' 
              alt={attributes.name}
              style={{ zIndex: 1 }}
            />
          </div>
        </Col>

        {/* Details Section */}
        <Col lg='6'>
          <div className="product__details bg-white rounded-3xl p-4 shadow-lg border border-gray-100 h-96">
            {/* Product Title */}
            <h2 className="text-gray-800 font-bold mb-3 text-2xl">{product?.attributes.name}</h2>
            
            {/* Rating Section */}
            <div className="product__rating d-flex align-items-center gap-3 mb-4">
              <div className="d-flex">
                <span className="text-warning"><i className="ri-star-s-fill"></i></span>
                <span className="text-warning"><i className="ri-star-s-fill"></i></span>
                <span className="text-warning"><i className="ri-star-s-fill"></i></span>
                <span className="text-warning"><i className="ri-star-s-fill"></i></span>
                <span className="text-warning"><i className="ri-star-half-s-line"></i></span>
              </div>
              <p className='mb-0 text-gray-600 small'>(<span className="text-indigo-600 font-semibold">4.5</span> avis)</p>
            </div>

            {/* Price and Category */}
            <div className='d-flex align-items-center gap-4 mb-4'>
              <span className='proudct__price text-indigo-600 font-bold text-xl'>{util.formatCirrency(attributes.price)}</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {attributes.category.data.attributes.name}
              </span>
            </div>

            {/* Description */}
            <div className="product-description mb-4">
              <h6 className="text-gray-700 font-semibold mb-2">Description :</h6>
              <div className="text-gray-600 text-sm" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                {attributes.description.split('-').map((desc, index) => (
                  desc.trim() && (
                    <div key={index} className="d-flex align-items-start mb-2">
                      <span className="bg-indigo-400 rounded-circle me-2 mt-1" style={{ width: '6px', height: '6px', flexShrink: 0 }}></span>
                      <span>{desc.trim()}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="btn btn-primary w-100 rounded-3xl py-3 bg-gradient-to-r from-indigo-600 to-purple-600 border-0 font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              onClick={addToCart}
            >
              <i className="ri-shopping-cart-line me-2"></i>
              Ajouter au panier
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
    <section>
      <Container>
        <Row>
        
          <Col lg='12' className='mt-5 mb-3'>
            <h2 className="related__title">Vous pourriez aussi aimer</h2>
          </Col>

          <ProductList data={relatedProducts} />
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default ProductDetails