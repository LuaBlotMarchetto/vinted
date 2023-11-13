import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, handleToken, search, setSearch }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src="src/assets/images/logo.svg" alt="" />
        </Link>
        <input
          type="text"
          placeholder="Recherche des articles"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
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
                handleToken(null);
                navigate("/");
              }}
              className="signout"
            >
              Se déconnecter
            </button>
          ) : null}

          <Link to="/login">
            <button>Vends tes articles</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
