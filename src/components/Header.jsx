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
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends tes articles</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
