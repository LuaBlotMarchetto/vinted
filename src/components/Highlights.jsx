import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Highlights = (props) => {
  const { page, limit } = useParams();

  const [currentPage, setCurrentPage] = useState(page || 1);
  const [totalPages, setTotalPages] = useState(1);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const pageNumber = [];
  for (let index = 0; index < totalPages; index++) {
    const number = index + 1;
    pageNumber.push(number);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (page && limit) {
          const response = await axios.get(
            `https://lereacteur-vinted-api.herokuapp.com/offers?page=${currentPage}&limit=${limit}`
          );
          setData(response.data);
          setIsLoading(false);
          setTotalPages(Math.ceil(response.data.count / limit));
        } else {
          const response = await axios.get(
            "https://lereacteur-vinted-api.herokuapp.com/offers"
          );
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [currentPage, limit, page]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="container ">
      <div className=" highlights">
        <div>
          <h2>Explorez les articles</h2>
        </div>
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
          <div className="articles">
            {data.offers.map((offer) => {
              return (
                <Link to={`/offer/${offer._id}`} key={offer._id}>
                  <div className="card">
                    <div className="card-seller-highlights">
                      {offer.owner?.account?.avatar?.url ? (
                        <img
                          src={offer.owner.account.avatar.url}
                          alt=""
                          className="card-small-avatar"
                        />
                      ) : (
                        <img
                          src="src/assets/images/empty-avatar.jpg"
                          alt=""
                          className="card-small-avatar"
                        />
                      )}
                      <p>{offer.owner.account.username}</p>
                    </div>
                    <img
                      src={offer.product_pictures[0].url}
                      alt=""
                      className="card-image"
                    />
                    <div className="card-product-info">
                      <p>{offer.product_price} €</p>
                      <p>{offer.product_details[1].TAILLE}</p>
                      <p>{offer.product_details[0].MARQUE}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pagination">
            {pageNumber.map((number) => (
              <button key={number} onClick={() => setCurrentPage(number)}>
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
