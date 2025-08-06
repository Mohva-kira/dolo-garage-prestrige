import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import {
  useGetTokenMutation,
  useLoginMutation,
  useSignUpMutation,
} from "../reducers/authSlice";
import {
  useSendMessageMutation,
  useSendMessageTemplateMutation,
} from "../reducers/whatsapp";
import { data } from "autoprefixer";
const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addNewUser, { isLoading }] = useSignUpMutation();
  const [login] = useLoginMutation();
  const [getToken] = useGetTokenMutation();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // Détection automatique du pays de l'utilisateur pour pré-sélectionner le code pays
  React.useEffect(() => {
    if (!countryCode) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          // Associer le code pays à la valeur du select
          if (data && data.country_code) {
            let code = "";
            switch (data.country_code) {
              case "CI":
                code = "225";
                break;
              case "ML":
                code = "223";
                break;
              case "SN":
                code = "221";
                break;
              default:
                code = "";
            }
            setCountryCode(code);
          }
        })
        .catch(() => {});
    }
  }, [countryCode]);
  // const [role, setRole] = useState("");
  const [sendWhatsapp] = useSendMessageMutation();
  const [sendWhatsappTemplate] = useSendMessageTemplateMutation();

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const convertData = () => {
    //   const mail = [];
    //   const pass = [];
    //   const roles = [];
    //   const fullname = [];
    //   const country_code = [];
    //   const phone = phone.startsWith("+") ? phone : `+${countryCode}${phone}`;
    //   const username = phone;

    //   fullname ? fullname.push({ value: fullname }) : [];
    //   country_code ? country_code.push({ value: countryCode }) : [];
    //   phone ? phone.push({ value: phone }) : [];
    //   username ? username.push({ value: username }) : [];
    //   email ? mail.push({ value: email }) : [];
    //   password ? pass.push({ value: password }) : [];
    //   roles.push({ target_id: "authenticated" });
    //   return { fullname: fullname, mail: mail, pass: pass, roles: roles, country_code: country_code, phone: phone, username: username };
    // };

    console.log("fullname", fullname);

    const msg = {
      body: `Bonjour ${fullname}, votre compte a été créé avec succès. Vous pouvez vous connecter avec les identifiants suivants : \n Email: ${email} \n Mot de passe: ${password}`,
      to: countryCode + phone,
      template: "bienvenue",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              parameter_name: "nom",
              text: fullname,
            },
          ],
        },
      ],
    };
    // let formData = new FormData();
    // formData.append("grant_type", "password");
    // formData.append("client_id", "f08017d1-24cb-4aaa-ae5f-45409913c027");
    // formData.append("client_secret", "simple_oauth_secret");
    // formData.append("username", phone);
    // formData.append("password", password);

    try {
      const data = await addNewUser({
        fullname,
        username: phone,
        email: phone + "@flywifi.com",
        password,
        country_code: countryCode,
      })
        .unwrap()
        .then((payload) => {
          console.log("fulfilled", payload)
          localStorage.setItem("user", JSON.stringify(payload));
        })
        .catch((error) => console.log("rejected", error));

      const alert = await sendWhatsappTemplate(msg)
        .unwrap()
        .then((payload) => console.log("fulfilled", payload))
        .catch((error) => console.log("rejected", error));

      

      // get User token after registration signin from drupal



      setLoading(false);
      toast.success("Account created");
      navigate("/home");
    } catch (error) {
      console.log(JSON.stringify(error));
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="6" className="text-center">
                <h5 className="fw-bold">Loading.. ....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4"> Signup </h3>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      onChange={(e) => setFullname(e.target.value)}
                      value={fullname}
                      placeholder="Nom et prénom"
                    />
                  </FormGroup>
                  <FormGroup className="form__group flex space-x-4">
                    <div class="relative inline-block w-64">
                      <select
                        onChange={(e) => setCountryCode(e.target.value)}
                        class="block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300">
                        <option value="225">🇨🇮 +225 Côte d'Ivoire</option>
                        <option value="223">🇲🇱 +223 Mali</option>
                        <option value="221">🇸🇳 +221 Sénégal</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                          <path d="M5.516 7.548L10 12.033l4.484-4.485L16 9.063 10 15.063 4 9.063z" />
                        </svg>
                      </div>
                    </div>

                    <input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="Téléphone"
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter your password"
                    />
                  </FormGroup>

                  {/* <FormGroup className='form__group'>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup> */}

                  <button type="submit" className="buy__btn auth__btn">
                    Créer un compte
                  </button>
                  <p>
                    {" "}
                    Déjà un compte? <Link to="/login">Connexion</Link>{" "}
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
