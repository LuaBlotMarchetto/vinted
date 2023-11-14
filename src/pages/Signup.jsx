import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  document.body.style.backgroundColor = "white";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletterOptin, setNewsletterOptin] = useState(false);
  const [connected, setConnected] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      //requête post avec les informations du formulaire
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter: newsletterOptin,
        }
      );
      //Mise en cookie du token

      handleToken(response.data.token);

      //modification de l'état de connexion et redirection
      setConnected(true);
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else if (error.response.status === 409) {
        setErrorMessage("Un compte existe déjà avec cet email.");
      }
      console.error(error.response.data);
    }
  };

  return (
    <main>
      <div className="container signup-content">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <div>
            <input
              type="checkbox"
              id="newsletter-optin"
              name="newsletter-optin"
              checked={newsletterOptin}
              onChange={(e) => setNewsletterOptin(e.target.checked)}
            />

            <label htmlFor="newsletter-optin" className="newsletter-label">
              S'inscrire à notre newsletter
            </label>
            <p className="newsletter-terms">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          <button type="Submit">S'inscrire</button>
        </form>
        <Link to="/login">
          <p className="connexion-redirection">
            Tu as déjà un compte ? Connecte-toi!
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Signup;
