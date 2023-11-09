import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src="src/assets/images/logo.svg" alt="" />
        </Link>
        <input type="text" placeholder="Recherche des articles" />
        <nav>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/signup">
            <button>Se connecter</button>
          </Link>
          <Link to="/signup">
            <button>Vends tes articles</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
