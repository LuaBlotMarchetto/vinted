import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-container">
          <div>
            <h2>Prêts à faire du tri dans vos placards?</h2>
          </div>
          <Link to="/publish">
            <button>Commencer à vendre</button>
          </Link>

          <p>Découvrir comment ça marche</p>
        </div>
      </div>
      <img src="src/assets/images/tear.svg" alt="" />
    </section>
  );
};

export default Hero;
