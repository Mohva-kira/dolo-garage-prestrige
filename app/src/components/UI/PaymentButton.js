import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { useInitiateCinetPayPaymentMutation } from '../../reducers/payment';
import { checkout } from '../../reducers/cinetGateway';
import { useSendMessageMutation, useSendMessageTemplateMutation } from '../../reducers/whatsapp';

const PaymentButton = ({ 
  totalAmount, 
  totalQty, 
  customerInfo, 
  orderId, 
  onPaymentSuccess, 
  onPaymentError,
  className = "buy__btn auth__btn w-100"
}) => {
  const [initiateCinetPayPayment, { isLoading }] = useInitiateCinetPayPaymentMutation();
  const [paymentMethod, setPaymentMethod] = useState('cinetpay');
 const [sendWhatsapp] = useSendMessageMutation()
  const [sendWhatsappTemplate] = useSendMessageTemplateMutation()


  const sendWhatsappMessage = async (msg) => {
    try {
      await sendWhatsappTemplate(msg).unwrap()
      console.log('WhatsApp message sent successfully')
    } catch (error) {
      console.error('Error sending WhatsApp message:', error)
    }
  }


  
  const handlePaymentSuccess = (response) => {
    // console.log('Paiement réussi:', response);
    
    // Envoyer un message WhatsApp de confirmation
    const msg = {
      body: `Bonjour ${customerInfo.name}, votre paiement a été initié avec succès. Détails de la commande : \n Total: ${totalAmount} € \n Quantité: ${totalQty} articles \n Transaction ID: ${response.data?.transaction_id}`,
      to: customerInfo.phone,
    };
    
    sendWhatsappMessage(msg);
    toast.success('Paiement initié avec succès! Vous allez être redirigé.');
  };

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.phone) {

      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {

          const msg = {
      body: `Bonjour ${customerInfo.name}, votre paiement a été initié avec succès. Détails de la commande : \n Total: ${totalAmount} € \n Quantité: ${totalQty} articles \n `,
      to: customerInfo.phone,
        components: [
        {
          type: "header",
          parameters: [
          {
            type: "image",
            image: {
              link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0awOQted7FxOd7vsmz0G7KR9AolCu8fzsBg&s", // Remplacez par l'URL de votre logo
            },
           
          }
          ],
        },
      ],
    };
    
    // sendWhatsappMessage(msg);
      if (paymentMethod === 'cinetpay') {
        await handleCinetPayPayment();
      }
      // Vous pouvez ajouter d'autres méthodes de paiement ici
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      toast.error('Erreur lors du paiement');
      if (onPaymentError) onPaymentError(error);
    }
  };

  const handleCinetPayPayment = async () => {
    const paymentData = {
      transaction_id: Math.floor(Math.random() * 100000000).toString(), // YOUR TRANSACTION ID
      amount: totalAmount,
       currency: "XOF",
        channels: "ALL",
        description: "Test de paiement",
        //Fournir ces variables pour le paiements par carte bancaire
        customer_name: "Joe", //Le nom du client
        customer_surname: "Down", //Le prenom du client
        customer_email: "down@test.com", //l'email du client
        customer_phone_number: "0701234567", //l'email du client
        customer_address: "BP 0024", //addresse du client
        customer_city: "Antananarivo", // La ville du client
        customer_country: "CM", // le code ISO du pays
        customer_state: "CM", // le code ISO l'état
        customer_zip_code: "06510", // code postal
    };

    try {
      const response = await checkout(paymentData)
      // Afficher la réponse CinetPay dans la console pour le débogage
      
      console.log('Réponse CinetPay:', response);

      
    } catch (error) {
      console.error('Erreur CinetPay:', error);
      toast.error(error.message || 'Erreur lors du paiement CinetPay');
      throw error;
    }
  };

  return (
    <div className="payment-section">
      <div className="payment-method-selection mb-3">
        <h6>Méthode de paiement :</h6>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="cinetpay"
            value="cinetpay"
            checked={paymentMethod === 'cinetpay'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="cinetpay">
            CinetPay (Mobile Money, Carte bancaire)
          </label>
        </div>
      </div>

      <button 
        onClick={handlePayment} 
        className={className}
        disabled={isLoading}
      >
        {isLoading ? 'Traitement en cours...' : `Payer ${totalAmount} Fcfa`}
      </button>

      {isLoading && (
        <div className="payment-loading mt-2">
          <small className="text-muted">
            Redirection vers la page de paiement...
          </small>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
