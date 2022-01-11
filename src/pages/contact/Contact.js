import React, { useState } from 'react';
import ContactForm from "./ContactForm";

const handleSubmit = (e) => {
  e.preventDefault()
}

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [topic, setTopic] = useState("")
  const [msg, setMsg] = useState("")
  const [response, setResponse] = useState("")
  const [agree, setAgree] = useState(false)

  return (
    <div id='contact'>
      <div className='row'>
        <div className='col col-12'>
          <h2 className='page-title header-button'>
            <span>Kontakt</span>
          </h2>
        </div>
        <div className="col col-12 col-lg-6">
          <h1 className="display-6 mb-3">Napisz do nas</h1>
          <ContactForm
            handleSubmit={handleSubmit}
            state={{ name, email, phone, topic, msg, response, agree }}
            setState={{ setName, setEmail, setPhone, setTopic, setMsg, setResponse, setAgree }}
          />
        </div>
        <div className="col-12 d-lg-none mt-4 mb-4"></div>
        <div className="col col-12 col-lg-6">
          <p className="lead">Nasze Centrum Pomocy jest do Państwa dyspozycji od poniedziałku do piątku w godzinach: 8:00-18:00.</p>
          <p className="display-6 mb-3"><small>Adres do korespondencji:</small></p>
          <p className="lead"><small>Adfinder <br /> ul. Stawowa 178 <br /> 00-000 Wrocław</small></p>
          <p className="display-6 mb-3"><small>Infolinia:</small></p>
          <p><small className="lead">(+48) 111-222-333</small> <br /> <small className="text-muted">połączenie płatne zgodnie z taryfą operatora</small></p>
          <p className="display-6 mb-3"><small>Email:</small></p>
          <p><small className="lead">adfinder@example.com</small></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
