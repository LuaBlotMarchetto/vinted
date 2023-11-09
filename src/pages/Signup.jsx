import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletterOptin, setNewsletterOptin] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
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
      const token = response.data.token;
      Cookies.set("token", token);

      //modification de l'état de connexion et redirection
      setConnected(true);
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
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

        <div>
          <input
            type="checkbox"
            id="newsletter-optin"
            name="newsletter-optin"
            checked={newsletterOptin}
            onChange={(e) => setNewsletterOptin(e.target.checked)}
          />
          <label htmlFor="newsletter-optin">
            S'inscrire à notre newsletter
          </label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button type="Submit">S'inscrire</button>
      </form>
      <p>Tu as déjà un compte ? Connecte-toi!</p>
    </div>
  );
};

export default Signup;
