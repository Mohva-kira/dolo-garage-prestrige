import React from "react";
import productImg from "../../assets/images/arm-chair-01.jpg";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import "../../styles/product-card.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../reducers/cartSlice";
import util from "../../util";
import { useGetProductsImagesQuery } from "../../reducers/products";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../../assets/images/logo.png";
import { CiWifiOn } from "react-icons/ci";
const ProductCard = ({ item }) => {
  const dataImages = useSelector((state) => state.products.items.included);

  const imageUrl = dataImages?.find(
    (el) => el.id === item.relationships.field_image.data[0].id
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.attributes.name,
        price: item.attributes.price,
        imgID: item.attributes.image.data[0].attributes.url,
        type: item.type,
      })
    );

    toast.success("Porduit ajouté au panier");
  };
  return (
    <Col lg="3" md="4" className="mb-6 px-3">
      <motion.div
        className="product-card bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 h-[500px] w-full flex flex-col"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.98 }}>
        {/* Image Container */}
        <div className="product-image-container relative h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
          <motion.img
          onClick={() => navigate(`/shop/${item.id}`)}
            src={
              item.attributes?.image
                ? "http://localhost:1337" +
                  item.attributes.image.data[0].attributes.url
                : logo
            }
            alt={item.attributes.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />

          {/* Quick Action Button */}
          <motion.button
            onClick={addToCart}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <CiShoppingCart className="text-indigo-600 text-lg" />
          </motion.button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <CiWifiOn className="text-indigo-600 text-sm" />
            <span className="text-xs font-medium text-gray-700">Auto</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Product Name */}
          <h3 
            onClick={() => navigate(`/shop/${item.id}`)}
            className="product-name text-gray-800 font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
          >
            {item.attributes.name}
          </h3>

          {/* Description */}
          <div className="product-description mb-4 h-24 overflow-hidden">
            <ul className="text-sm text-gray-600 space-y-1">
              {item.attributes.description
                .split("-")
                .slice(0, 3)
                .map((desc, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="line-clamp-1">{desc.trim()}</span>
                  </li>
                ))}
            </ul>
          </div>
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="price">
              <span className="text-2xl font-bold text-indigo-600">
                {util.formatCirrency(Number(item.attributes.price))}
              </span>
            </div>

            <motion.button
              onClick={addToCart}
              className="add-to-cart-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Ajouter
            </motion.button>
          </div>
        </div>

        {/* Subtle gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
      </motion.div>
    </Col>
  );
};

export default ProductCard;
