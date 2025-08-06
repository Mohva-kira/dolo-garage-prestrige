import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <Helmet title="Paiement Annulé">
      <CommonSection title="Paiement Annulé" />
      <section className="payment-result">
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="10">
              <div className="payment-cancel-card">
                <div className="cancel-icon">
                  <i className="ri-close-circle-line"></i>
                </div>
                
                <h2 className="cancel-title">Paiement Annulé</h2>
                
                <p className="cancel-message">
                  Votre paiement a été annulé. Votre commande n'a pas été traitée.
                </p>

                <div className="cancel-reasons">
                  <h5>Raisons possibles :</h5>
                  <ul>
                    <li>Vous avez annulé la transaction</li>
                    <li>Problème technique temporaire</li>
                    <li>Fonds insuffisants</li>
                    <li>Erreur de saisie des informations</li>
                  </ul>
                </div>

                <div className="action-buttons">
                  <button 
                    onClick={handleRetryPayment}
                    className="btn btn-primary me-3"
                  >
                    Réessayer le paiement
                  </button>
                  <button 
                    onClick={handleContinueShopping}
                    className="btn btn-outline-primary"
                  >
                    Continuer mes achats
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PaymentCancel;
