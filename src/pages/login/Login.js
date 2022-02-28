import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGetGlobalState } from "../../contexts/GlobalContext";

// Components
import Loading from "../loading/Loading";
import ErrorContent from "../errorContent/ErrorContent";
import SectionEmail from "./SectionEmail";
import SectionPassword from "./SectionPassword";
import SectionReset from "./SectionReset";
import { Demo } from "../../components/demo/Demo";

// CSS Styles
import "./Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loaders, setLoaders] = useState({
    isLoadingGlobalState: true,
    isLoadingCookieEmail: true,
  });
  const [userEmail, setUserEmail] = useState("");
  const [step, setStep] = useState("email");

  const history = useHistory();
  const globalState = useGetGlobalState();

  // LOADERS
  useEffect(() => {
    if (!loaders.isLoadingGlobalState && !loaders.isLoadingCookieEmail) {
      setIsLoading(false);
    }
  }, [loaders.isLoadingGlobalState, loaders.isLoadingCookieEmail]);

  // LOADING GLOBAL STATE
  useEffect(() => {
    if (globalState && !globalState.isLoading) {
      setLoaders((prevState) => ({
        ...prevState,
        isLoadingGlobalState: false,
      }));
    }
    // eslint-disable-next-line
  }, [globalState.isLoading]);

  // LOADING LAST USED EMAIL
  useEffect(() => {
    const checkCookieEmail = async () => {
      const cookieEmail = await Cookies.get("last_used_email");

      if (cookieEmail) {
        setUserEmail(cookieEmail);
        setStep("password");
      }
    };

    checkCookieEmail().then(
      setLoaders((prevState) => ({
        ...prevState,
        isLoadingCookieEmail: false,
      }))
    );
  }, []);

  // Redirect if user is logged
  useEffect(() => {
    if (globalState.user) {
      history.push("/");
    }
    // eslint-disable-next-line
  });

  if (isLoading) {
    return <Loading />;
  } else if (!isLoading) {
    return (
      <div
        id="login"
        className="container-fullscreen"
        style={{
          display: "flex",
          position: "relative",
        }}
      >
        <div
          className="left-column"
          style={{
            backgroundImage: "url(./img/intro_bg.jpg)",
          }}
        ></div>
        <div className="right-column">
          <div className="form-wrapper">
            {step === "email" && (
              <SectionEmail useState={{ setStep, setUserEmail }} />
            )}
            {step === "password" && (
              <SectionPassword useState={{ userEmail, setStep }} />
            )}
            {step === "reset" && <SectionReset />}
            <div style={{ marginLeft: "-30px" }}>
              <Demo
                title="DEMO"
                message="Email: demo@example.com / Hasło: password"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <ErrorContent />;
  }
};

export default Login;
