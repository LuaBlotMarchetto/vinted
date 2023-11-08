import { Link } from "react-router-dom";

const Highlights = (props) => {
  return (
    <div className="container highlights">
      <div className="filters">
        <div>
          <p>Trier par prix</p>
          <button>tri</button>
        </div>
        <div>
          <p>Prix entre</p>
          <button>barre de tri</button>
        </div>
      </div>
      <div>
        <div>
          <h2>Explorez les articles</h2>
        </div>
        <div className="articles">
          {props.data.offers.map((offer) => {
            return (
              <Link to={`/offer/${offer._id}`} key={offer._id}>
                <div className="card">
                  <div className="card-seller">
                    <img
                      src={offer.owner.account.avatar.url}
                      alt=""
                      className="card-small-avatar"
                    />
                    <p>{offer.owner.account.username}</p>
                  </div>
                  <img
                    src={offer.product_pictures[0].url}
                    alt=""
                    className="card-image"
                  />
                  <div>
                    <p>{offer.product_price} €</p>
                    <p>{offer.product_details[1].TAILLE}</p>
                    <p>{offer.product_details[0].MARQUE}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
