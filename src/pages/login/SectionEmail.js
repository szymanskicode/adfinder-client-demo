import Cookies from "js-cookie";
import { useState } from "react";
import validator from "validator";

const SectionEmail = (props) => {
  const { setStep, setUserEmail } = props.useState;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Proceed to password step
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("E-mail jest wymagany.");
    } else if (!validator.isEmail(email)) {
      setEmailError("E-mail jest nieprawidłowy.");
    } else if (email.length > 100) {
      setEmailError("E-mail nie może być dłuższy niż 100 znaków.");
    } else {
      setUserEmail(email);
      setStep("password");
      Cookies.set("last_used_email", email, { path: "", expires: 365 });
    }
  };

  return (
    <section>
      <div className="form-header">
        <span style={{ margin: "0 auto" }}>Przejdź do serwisu</span>
      </div>
      <div className="form-content">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              autoFocus
            />
            <div id="emailHelp" className="form-text text-danger">
              {emailError}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ display: "block", margin: "0 auto" }}
          >
            Dalej <i className="bi-chevron-right"></i>
          </button>
        </form>
      </div>
      <div className="forget-password">
        <a
          href="/logowanie"
          onClick={() =>
            alert("Funkcjonalość niedostępna w wersji demonstracyjnej.")
          }
        >
          Nie pamiętasz hasła?
        </a>
      </div>
    </section>
  );
};

export default SectionEmail;
