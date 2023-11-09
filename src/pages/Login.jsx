import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const token = response.data.token;
      Cookies.set("token", token);

      //remise à zéro du formulaire
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
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

        <button type="Submit">Se connecter</button>
      </form>
      <p>Pas encore de compte ? Inscris-toi!</p>
    </div>
  );
};

export default Login;
