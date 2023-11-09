import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [connected, setConnected] = useState(token ? true : false);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src="src/assets/images/logo.svg" alt="" />
        </Link>
        <input type="text" placeholder="Recherche des articles" />
        <nav>
          {!token ? (
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
          ) : null}
          {!token ? (
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          ) : null}
          {token ? (
            <button
              onClick={() => {
                Cookies.remove("token");
                setConnected(false);
                navigate("/");
              }}
              className="signout"
            >
              Se déconnecter
            </button>
          ) : null}

          <Link to="/signup">
            <button>Vends tes articles</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
