

import React from 'react'
import productImg from '../../assets/images/arm-chair-01.jpg'
import { motion } from 'framer-motion'
import { Col } from 'reactstrap'
import "../../styles/product-card.css"
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify'

import { useDispatch, useSelector } from "react-redux"
import { cartActions } from '../../reducers/cartSlice'
import util from '../../util'
import { useGetProductsImagesQuery } from '../../reducers/products'
import { CiShoppingCart } from "react-icons/ci";
import logo from '../../assets/images/logo.png'
import { CiWifiOn } from "react-icons/ci";
const ProductCard = ({item}) => {


    const dataImages = useSelector((state) => state.products.items.included)


    const imageUrl = dataImages?.find(el => el.id === item.relationships.field_image.data[0].id)

    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.attributes.name,
            price: item.attributes.price,
            imgID: item.attributes.image.data[0].attributes.url,
            type: item.type
        }))

        toast.success('Porduit ajouté au panier')
    }
    return (
        <Col lg='3' md='4' className='mb-4' >
       
           
            <div className=" bg-orange-500 rounded-2xl overflow-hidden z-50 relative h-64">

               <div className="w-full h-1/2 absolute -top-24 rounded-full border-white border-2 overflow-hidden">
</div>
                <div className=" h-full absolute w-full  flex items-center justify-center">
                    <motion.img
                        whileHover={{ scale: 0.9 }} 
                        src={'http://localhost:1337' + item?.attributes.image.data[0].attributes.url || productImg}
                        alt={'Product Image'}  
                        className='wfull h-3/4 -z-50 opacity-40 object-contain'
                        onClick={addToCart}
                    />
                    
                </div>
                {/* <div className="product__img">
                    <motion.img whileHover={{scale: 0.9}} src={`http://localhost:1337${item.attributes.image.data[0].attributes.url}`} alt="" />
                </div> */}
               <div className="p-2 flex text-center mt-10 z-50 flex-col justify-between w-full text-2xl font-bold">   

            <div className="product__content text-left flex space-x-2 items-center justify-start">    
            
                <CiWifiOn size={45} className=' text-white font-bold shadow-sm' />
               <h3 className="product__name text-white"><Link to={`/shop/${item.id}`}> {item.attributes.name} </Link></h3>
               </div>
                <span className='text-xs text-white'> <ul className='list-disc w-full flex flex-col justify-center mt-2  text-left text-white px-6 shadow-sm '>
                    {item.attributes.description.split("-").map(item => <li>{item}</li> )} 
                    </ul> </span>
               </div>
                <div className="product__card-bottom d-flex z-50 bottom-0 absolute items-center justify-between w-full p-2">
                    <div className=" text-white font-extrabold text-2xl">{util.formatCirrency( Number(item.attributes.price) ) }</div>
                    <motion.div onClick={() => addToCart()} className='text-white font-extrabold' whileTap={{scale: 1.2}}><CiShoppingCart className='text-white font-extrabold' size={30} /></motion.div>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard 