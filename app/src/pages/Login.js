import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'


import { useGetTokenMutation, useLoginMutation } from '../reducers/authSlice'
import '../styles/login.css'


const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [getToken] = useGetTokenMutation()
  const [login] = useLoginMutation()
  const navigate = useNavigate()



  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      // const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // const user = userCredential.user


      // formData.append('username', user.displayName)


      await login({ identifier: phone, password })
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload)
          localStorage.setItem('user', JSON.stringify(payload))
          toast.success('Successfull logged in')
          navigate('/checkout')
          setLoading(false)

        })
        .catch((error) => {
          console.log('rejected', error)
          setLoading(false)
          toast.error('Email ou mot de passe incorrect - ' + error.data.error.message)
          // toast.error(error.data.message || error.error)
        })


    


    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }



  return <Helmet title='Login'>
    <section>
      <Container>
        <Row>
          {
            loading ? <Col lg='12' className='text-center'> <h5 className='fw-bold'>Loading.......</h5> </Col> :
              <Col lg='6' className='m-auto text-center'>
                <h3 className="fw-bold mb-4"> Connectez vous </h3>
                <Form className='auth__form' onSubmit={signIn}>
                  {/* <FormGroup className='form__group'>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Entrez votre email' />
                  </FormGroup> */}
                   <FormGroup className='form__group'>
                    <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='Entrez votre numéro de téléphone' />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Votre mot de passe' />
                  </FormGroup>

                  <button type='submit' className="buy__btn auth__btn">Connexion</button>
                  <p> Pas de compte? <Link to='/signup'>Inscrivez vous ?</Link> </p>
                </Form>
              </Col>
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Login
