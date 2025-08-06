import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/checkout.css'
import { useSelector } from 'react-redux'
import { useCheckoutOrderMutation, usePlaceOrderQuery } from '../reducers/cartSlice'
import  '../assets/js/cinetPay.js'
import { useGetTokenMutation } from '../reducers/payment.js'
import { useSendMessageMutation, useSendMessageTemplateMutation } from '../reducers/whatsapp.js'
import PaymentButton from '../components/UI/PaymentButton'
import { toast } from 'react-toastify'

const Checkout = () => {
  const totalQty = useSelector(state=> state.cart.totalQuantity)
  const totalAmount = useSelector(state=> state.cart.totalAmount)
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  console.log('user', user)
  const [sendWhatsapp] = useSendMessageMutation()
  const [sendWhatsappTemplate] = useSendMessageTemplateMutation()

  // État pour les informations du client
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.user?.fullname || '',
    phone: user?.user?.username || '',
  
  });

  const drupalCart = useSelector(state => state.cart.drupalCart)
  const orderId = drupalCart[0]?.relationships?.order_id?.data.id

  const [getToken] = useGetTokenMutation()
  const [checkoutOrder] = useCheckoutOrderMutation()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const getDataBody = () =>  {
    const data = {} 

   

    return {data: {"type": "order--default", "id": orderId, "attributes": {"payment_instrument": {"payment_gateway_id": "stripejs" } }}}
}

const bodyData = getDataBody()

const checkoutInfo = {orderId: orderId, bodyData: JSON.stringify(bodyData)}

const [skip, setSkip] = useState(true)
  // const {data, isLoading, isFetching, isSuccess, isError} = usePlaceOrderQuery(orderId, bodyData, {skip} )

  


  const handlePaymentError = (error) => {
    console.error('Erreur de paiement:', error);
    toast.error('Erreur lors du paiement. Veuillez réessayer.');
  };

  return <Helmet title='Paiement'> 
    <CommonSection  title="Paiement" />

   
    <section>
      <Container>
   
        <Row>
          <Col lg='8'>
            <h6 className="mb-4 fw-bold">Information de facturation</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input 
                  type="text" 
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder='Nom et prénom *' 
                  required 
                />
              </FormGroup>
              
            

              <FormGroup className='form__group'>
                <input 
                  type="tel" 
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder='Numéro de téléphone *' 
                  required 
                />
              </FormGroup>

            

              <FormGroup className='form__group'>
                <select 
                  name="country" 
                  value={customerInfo.country}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="ML">Mali</option>
                  <option value="SN">Sénégal</option>
                  <option value="GH">Ghana</option>
                </select>
              </FormGroup>
            </Form>
          </Col>
          <Col lg="4">
            <div className="checkout__cart">
              <h6>Total Qte: <span> {totalQty} articles </span></h6>
              <h6>Sous Total: <span> {totalAmount} Fcfa</span></h6>
              <h6> <span>Frais: <br/> Gratuit </span>  <span>0 Fcfa</span></h6>
             
              <h4>Coût Total: <span> {totalAmount} Fcfa</span></h4>
              
              <PaymentButton
                totalAmount={totalAmount}
                totalQty={totalQty}
                customerInfo={customerInfo}
                orderId={orderId}
              
                onPaymentError={handlePaymentError}
              />
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout