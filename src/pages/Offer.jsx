import { useParams } from "react-router-dom";

const Offer = ({ data, setData }) => {
  const { id } = useParams();
  let offerToDisplay = data.offers.find((elem) => elem._id === id);

  const renderProductDetails = () => {
    return offerToDisplay.product_details.map((property, index) => {
      const propertyName = Object.keys(property)[0];
      const propertyValue = property[propertyName];

      return (
        <div key={index}>
          <div>
            <p>{propertyName}</p>
          </div>
          <div>
            <p>{propertyValue}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <main className="product-background">
      <div className="container ">
        <div className="container product-main">
          <div>
            <img
              src={offerToDisplay.product_pictures[0].url}
              alt=""
              className="product-image"
            />
          </div>
          <div className="product-card">
            <div>
              <h3>{offerToDisplay.product_price} €</h3>
              <div>{renderProductDetails()}</div>
            </div>
            <div>
              <h4>{offerToDisplay.product_name}</h4>
              <p>{offerToDisplay.product_description}</p>
            </div>
            <div className="card-seller">
              <img
                src={offerToDisplay.owner.account.avatar.url}
                alt=""
                className="card-small-avatar"
              />
              <p>{offerToDisplay.owner.account.username}</p>
            </div>
            <div>
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
