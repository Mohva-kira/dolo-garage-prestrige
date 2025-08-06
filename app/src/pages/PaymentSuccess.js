import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCheckPaymentStatusQuery } from '../reducers/payment';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/payment-result.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    const txId = searchParams.get('transaction_id') || searchParams.get('cpm_trans_id');
    if (txId) {
      setTransactionId(txId);
    }
  }, [searchParams]);

  const { data: paymentStatus, isLoading, error } = useCheckPaymentStatusQuery(transactionId, {
    skip: !transactionId
  });

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  return (
    <Helmet title="Paiement Réussi">
      <CommonSection title="Paiement Réussi" />
      <section className="payment-result">
        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="10">
              <div className="payment-success-card">
                <div className="success-icon">
                  <i className="ri-check-double-line"></i>
                </div>
                
                <h2 className="success-title">Paiement Réussi !</h2>
                
                <p className="success-message">
                  Votre commande a été payée avec succès. Vous recevrez bientôt un email de confirmation.
                </p>

                {transactionId && (
                  <div className="transaction-details">
                    <h5>Détails de la transaction</h5>
                    <p><strong>ID de transaction:</strong> {transactionId}</p>
                    
                    {isLoading && (
                      <div className="status-loading">
                        <i className="ri-loader-2-line"></i> Vérification du statut...
                      </div>
                    )}
                    
                    {paymentStatus && (
                      <div className="payment-status">
                        <p><strong>Statut:</strong> {paymentStatus.data?.cpm_trans_status}</p>
                        <p><strong>Montant:</strong> {paymentStatus.data?.cpm_amount} {paymentStatus.data?.cpm_currency}</p>
                      </div>
                    )}
                    
                    {error && (
                      <div className="status-error">
                        <p>Impossible de vérifier le statut du paiement</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="action-buttons">
                  <button 
                    onClick={handleViewOrders}
                    className="btn btn-primary me-3"
                  >
                    Voir mes commandes
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

export default PaymentSuccess;
