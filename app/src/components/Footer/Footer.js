import React from "react";
import "./footer.css";
import logo from "../../assets/images/logo.png";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="logo">
              <div>
                <h1 className="text-white">
                  Dolo <span className="text-warning">Garage</span>{" "}
                  <span className="text-danger">Prestige</span>
                </h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Dolo Garage Prestige est votre partenaire de confiance pour tous
              vos besoins automobiles. Spécialisés dans la réparation,
              l'entretien et la vente de pièces détachées, nous offrons des
              services de qualité supérieure avec une expertise technique
              reconnue. Notre équipe de mécaniciens qual
              ifiés vous garantit des
              interventions professionnelles pour maintenir votre véhicule en
              parfait état de fonctionnement.
            </p>
          </Col>

          <Col lg="2" className="mb-4" md="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Liens utiles</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Boutique</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Panier</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Connexion</Link>
                </ListGroupItem>
                {/* <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Privacy Policy</Link>
              </ListGroupItem> */}
              </ListGroup>
            </div>
          </Col>
          <Col lg="3 " md="4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>Niamakoro - Prêt du pont tordu</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+223 83 96 63 62</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>promotrice@dologarageprestige.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year}   Dolo <span className="text-warning">Garage</span>{" "}
              <span className="text-danger">Prestige</span> All right reserved. (Tout droit réserver) -  developed by <a href="https://flyentreprise.com" className=" font-bold"> Fly </a> . {" "}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
