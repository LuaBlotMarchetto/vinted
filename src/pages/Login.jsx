import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken }) => {
  document.body.style.backgroundColor = "white";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //requête post avec les informations du formulaire
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      //Mise en cookie du token
      handleToken(response.data.token);

      //remise à zéro du formulaire
      navigate("/");
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Adresse email ou mot de passe érronné(s)");
      }

      console.error(error.response.data);
    }
  };

  return (
    <main>
      <div className="container signup-content">
        <h2>Se connecter</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error-message">{errorMessage}</p>
          <button type="Submit">Se connecter</button>
        </form>
        <Link to="/signup">
          <p className="connexion-redirection">
            Pas encore de compte ? Inscris-toi!
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
