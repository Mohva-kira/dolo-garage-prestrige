import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import heroImage from "../assets/images/bamako.png";
import counterImg from "../assets/images/femme.png";
import Helmet from "../components/Helmet/Helmet";
import ProductList from "../components/UI/ProductList";
import { useGetProductsQuery } from "../reducers/products";
import Services from "../services/Services";
import "../styles/home.css";

const Home = () => {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, isSuccess } = useGetProductsQuery({});

  const [trendingProduct, setTrendingProduct] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const all = data?.data || [];
    setTrendingProduct(all.filter((item) => item.category?.name === "consommable"));
    setBestSalesProducts(all.filter((item) => item.category?.name !== "consommable"));
  }, [isSuccess]);

  return (
    <Helmet title={"Home"}>
      <main className="home-page">
        <div className="app-frame">
          <div className="topbar">
            <div className="topbar__left">
              <div className="logo">Dolo.</div>
            </div>
            <div className="topbar__center">
              <input className="search" placeholder="Search products..." aria-label="Recherche de produits" />
            </div>
            <div className="topbar__right">
              <button className="icon-btn" aria-label="favorites">♥</button>
              <button className="icon-btn" aria-label="cart">🛒</button>
              <div className="avatar">A</div>
            </div>
          </div>

          <div className="layout">
            <section className="hero__section">
              <div className="card card--hero">
                <div className="hero__inner">
                  <div className="hero__text">
              <p className="hero_subtitle" aria-hidden>
                Dolo <span className="text-warning">Garage</span>{" "}
                <span className="text-danger">Prestige</span> {year}
              </p>
              <h1 className="hero__title">Le meilleur du matériel auto, du luxe à l’essentiel</h1>
              <p className="hero__lead">
                Sélection premium de pièces et accessoires pour voitures de luxe
                et solutions fiables pour tout véhicule. Qualité, performance et
                style — tout en un seul endroit.
              </p>

              <div className="hero__cta">
                <motion.a whileTap={{ scale: 0.98 }} className="btn primary" href="/shop">
                  Découvrir la boutique
                </motion.a>
                <Link to="/contact" className="btn outline" aria-label="Contactez-nous pour une assistance personnalisée">Contact</Link>
              </div>
            </div>

                    <div className="hero__media" role="img" aria-label="Photo d'illustration">
                      <img src={heroImage} alt="Illustration produits auto" />
                    </div>
                  </div>

                  <div className="mini-cards">
                    <div className="mini-card">
                      <div className="mini-media">
                        <img src={heroImage} alt="mini" />
                      </div>
                      <div className="mini-title">More Products</div>
                      <div className="mini-sub">460 plus items</div>
                    </div>
                    <div className="mini-card">
                      <div className="mini-media small">
                        <img src={counterImg} alt="mini2" />
                      </div>
                      <div className="mini-title">Popular</div>
                      <div className="mini-sub">5m+ downloads</div>
                    </div>
                    <div className="mini-card">
                      <div className="mini-media small">
                        <img src={heroImage} alt="mini3" />
                      </div>
                      <div className="mini-title">New</div>
                      <div className="mini-sub">Listening Has Been Released</div>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="sidebar">
                <div className="card card--sidebar">
                  <h4>Popular Colors</h4>
                  <div className="chips">
                    <button className="chip blue" aria-label="bleu" />
                    <button className="chip orange" aria-label="orange" />
                    <button className="chip green" aria-label="vert" />
                    <button className="chip red" aria-label="rouge" />
                    <button className="chip cyan" aria-label="cyan" />
                  </div>
                </div>

                <div className="card card--small">
                  <div className="small-media"><img src={counterImg} alt="prod" /></div>
                  <div className="small-title">New Gen X-Bud</div>
                </div>

                <div className="card card--small">
                  <div className="small-media"><img src={heroImage} alt="prod2" /></div>
                  <div className="small-title">Light Grey Headphone</div>
                </div>
              </aside>
            </div>
          </div>

        <Services />

        <section className="section section--products container-lg">
          <div className="card card--products">
            <header className="section__header">
            <h2 className="section__title">Les consommables</h2>
            <p className="section__subtitle">Articles fréquemment utilisés pour l'entretien et les petits services.</p>
          </header>

          {isFetching && <p className="muted">Chargement des produits...</p>}

            <ProductList data={trendingProduct} showMoreLink="/shop?filter=consommable" />
          </div>
        </section>

        <section className="section section--promo">
          <div className="container-lg">
            <div className="card card--promo">
              <div className="promo__inner">
                <div className="promo__text">
              <h3>Offre exclusive</h3>
              <p>Profitez de réductions sur une sélection de pièces de haute qualité.</p>
              <motion.a whileTap={{ scale: 0.98 }} className="btn secondary" href="/shop">
                Voir les offres
              </motion.a>
            </div>
                <div className="promo__media">
                  <img src={counterImg} alt="Offres spéciales" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {bestSalesProducts?.length > 0 && (
          <section className="section section--products container-lg">
            <div className="card card--products">
              <header className="section__header">
              <h2 className="section__title">Accessoires auto</h2>
              <p className="section__subtitle">Sélection d'accessoires choisis pour leur qualité et leur utilité.</p>
            </header>

              <ProductList data={bestSalesProducts} showMoreLink="/shop?filter=accessoires" />
            </div>
            </section>
        )}
      </main>
    </Helmet>
  );
};

export default Home;
