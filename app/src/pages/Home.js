import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import heroImage from "../assets/images/bamako.jpg";
import counterImg from "../assets/images/femme.png";
import Helmet from "../components/Helmet/Helmet";
import Clock from "../components/UI/Clock";
import ProductList from "../components/UI/ProductList";
import { useGetProductsQuery, useLazyGet_product_by_categoryQuery } from "../reducers/products";
import Services from "../services/Services";
import "../styles/home.css";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isFetching, isSuccess } = useGetProductsQuery({});
  const [get_product_by_category, { data: dataByCategory, isLoading: isLoadingByCategory }] = useLazyGet_product_by_categoryQuery();
  const [get_product_by_category_2, { data: dataByCategory_2, isLoading: isLoadingByCategory_2 }] = useLazyGet_product_by_categoryQuery();

  const [trendingProduct, setTrendingProduct] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const naturalProducts = data?.data.filter((item) => item);

    
    
  }, [isSuccess]);


  useEffect(() => {
    get_product_by_category({ category: 'accessores', page: 1, pageSize: 6 });
    get_product_by_category_2({ category: 'consommable', page: 1, pageSize: 6 });
    console.log("dataByCategory", dataByCategory);
    
  }
  , []);

  useEffect(() => {
    
    console.log("dataByCategory", dataByCategory);
    setBestSalesProducts(dataByCategory?.data || []);
    setTrendingProduct(dataByCategory_2?.data || []); 
  }, [dataByCategory, dataByCategory_2]);
  

  return (
    <Helmet title={"Home"}>
      {console.log("data", trendingProduct)}
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero_subtitle uppercase">
                Dolo <span className="text-warning">Garage</span>{" "}
                <span className="text-danger">Prestige</span> {year}
                </p>
                <h2>Le meilleur du matériel auto, du luxe à l’essentiel</h2>
                <p>
                  Commencez par l’excellence avec notre sélection exclusive
                  d’accessoires et de pièces haut de gamme pour voitures de
                  luxe. Puis explorez une large gamme de solutions fiables et
                  accessibles pour équiper tous types de véhicules. Performance,
                  style et qualité, réunis dans une seule application.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  {" "}
                  <Link to="/shop">Boutique</Link>{" "}
                </motion.button>
              </div>
            </Col>
            <Col lg="6" mg="6">
              <div className="hero__img">
                <img src={heroImage} alt="femme" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-4">
              <h2 className="section__title text-3xl">Les consommables</h2>
            </Col>
            {isFetching && <h2 className="section__title">Wait ....</h2>}
            <ProductList data={trendingProduct} isFetching={isFetching} />
          </Row>
        </Container>
      </section>
      {/* <section className="best__sales">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className="section__title">Pour la maison</h2>

          </Col>
          <ProductList data={bestSalesProducts} isFetching={isFetching} />

        </Row>
      </Container>
    </section> */}

      <section className="timer__count ">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Offre exclusive</h4>
                <h3 className="text-white fs-5 mb-3">
                  Les meilleures pièces auto à prix réduit
                </h3>
              </div>
              {/* <Clock /> */}
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn">
                <Link to="/shop"> Les meilleurs offres </Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img h-full  ">
              <img src={counterImg} alt="" className="object-cover " />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
      {bestSalesProducts?.length  > 0 &&
        <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'> Accessoires auto</h2>
          </Col>
          <ProductList data={bestSalesProducts} isLoading={isLoading} />
          <ProductList data={wirelessProducts} isLoading={isLoading} />
        </Row>
      </Container>
      }
    </section>
    {/* <section className="popular__category">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'> Catégorie Populaire </h2>
          </Col>
          <ProductList data={popularProducts} isLoading={isLoading} />
        </Row>
      </Container>
    </section> */}
    </Helmet>
  );
};

export default Home;
