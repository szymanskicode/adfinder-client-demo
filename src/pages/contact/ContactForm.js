const ContactForm = ({ handleSubmit, state, setState }) => {
  const { name, email, phone, topic, msg, response, agree } = state
  const { setName, setEmail, setPhone, setTopic, setMsg, setResponse, setAgree } = setState

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Imię i nazwisko</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Telefon</label>
        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <label htmlFor="topic" className="form-label">Temat wiadomości</label>
      <select className="form-select mb-3" aria-label="Wybierz temat wiadomości" value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option value=""></option>
        <option value="Mam pytanie">Mam pytanie</option>
        <option value="Współpraca">Współpraca</option>
        <option value="Reklamacja">Reklamacja</option>
      </select>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Treść wiadomości</label>
        <textarea className="form-control mb-4" id="message" rows="3" value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="radio"
          name="response"
          id="email-response"
          value={"email"}
          onChange={(e) => setResponse(e.target.value)}
          checked={response === "email"}
        />
        <label className="form-check-label" htmlFor="email-response">
          Chcę otrzymać odpowiedź mailową
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="response"
          id="phone-response"
          value={"phone"}
          onChange={(e) => setResponse(e.target.value)}
          checked={response === "phone"}
        />
        <label className="form-check-label" htmlFor="phone-response">
          Chcę otrzymać odpowiedź telefoniczną
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="agree"
          onChange={() => setAgree(!agree)}
          checked={agree}
        />
        <label className="form-check-label" htmlFor="agree">
          Wyrażam zgodę na przetwarzanie przez Adfinder moich danych osobowych zawartych w formularzu kontaktowym na potrzeby realizacji przesłanego zgłoszenia.
        </label>
      </div>
      <div className="form-check">
        <button className="btn btn-primary btn-lg float-end mb-3 ps-5 pe-5" type="submit"><big>Wyślij</big></button>
      </div>
    </form>
  );
}

export default ContactForm;