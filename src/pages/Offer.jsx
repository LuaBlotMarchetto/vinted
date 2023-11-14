import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  let offerToDisplay = data;

  const renderProductDetailsInfos = () => {
    return offerToDisplay.product_details.map((property, index) => {
      const propertyName = Object.keys(property)[0];
      const propertyValue = property[propertyName];
      return <p key={index}>{propertyValue}</p>;
    });
  };

  const renderProductDetailsLabels = () => {
    return offerToDisplay.product_details.map((property, index) => {
      const propertyName = Object.keys(property)[0];
      return <p key={index}>{propertyName}</p>;
    });
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="product-background">
      <div className="container ">
        <div className="product-container">
          <div>
            <img
              src={offerToDisplay.product_pictures[0].url}
              alt=""
              className="product-image"
            />
          </div>
          <div className="product-card ">
            <div className="product-card-content">
              <div>
                <h3>{offerToDisplay.product_price} €</h3>
                {/* <div>{renderProductDetails()}</div> */}
                <div className="product-info">
                  <div className="product-card-labels">
                    {renderProductDetailsLabels()}
                  </div>
                  <div className="product-card-infos">
                    {renderProductDetailsInfos()}
                  </div>
                </div>
              </div>
              <div>
                <h4>{offerToDisplay.product_name}</h4>
                <p>{offerToDisplay.product_description}</p>
              </div>
              <div className="card-seller-offer">
                {offerToDisplay.owner?.account?.avatar?.url && (
                  <img
                    src={offerToDisplay.owner.account.avatar.url}
                    alt=""
                    className="card-small-avatar"
                  />
                )}
                <p>{offerToDisplay.owner.account.username}</p>
              </div>
              <div>
                {token ? (
                  <Link
                    to="/payment"
                    state={{
                      title: offerToDisplay.product_name,
                      price: offerToDisplay.product_price,
                    }}
                  >
                    <button>Acheter</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button>Acheter</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
