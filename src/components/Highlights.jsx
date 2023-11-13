import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Highlights = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("price-asc");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(2000);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?` +
            (search !== undefined ? `&title=${search}` : "") +
            (page !== undefined ? `&page=${page}` : "") +
            (limit !== undefined ? `&limit=${limit}` : "") +
            (sort !== undefined ? `&sort=${sort}` : "") +
            (priceMin !== undefined ? `&priceMin=${priceMin}` : "") +
            (priceMax !== undefined ? `&priceMax=${priceMax}` : "")
        );
        setData(response.data);
        setIsLoading(false);
        setTotalPages(Math.ceil(response.data.count / limit));

        // const pageNumber = [];
        // for (let index = 0; index < totalPages; index++) {
        //   const number = index + 1;
        //   pageNumber.push(number);
        // }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page, limit, sort, priceMin, priceMax, totalPages]);

  const pageNumber = [];
  for (let index = 0; index < totalPages; index++) {
    const number = index + 1;
    pageNumber.push(number);
  }

  console.log(page);
  // console.log(number);
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
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
              }}
            >
              <option value="price-asc">Par prix croissant</option>
              <option value="price-desc">Par prix décroissant</option>
            </select>
          </div>
          <div>
            <p>Prix entre</p>
            <input
              type="number"
              placeholder="prix min"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              type="number"
              placeholder="prix max"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
          <div>
            <p>Nombre d'articles par page</p>
            <input
              type="number"
              placeholder="ex: 10"
              value={limit}
              onChange={(event) => {
                setLimit(event.target.value);
              }}
            />
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
              <button
                key={number}
                onClick={() => {
                  setPage(number);
                }}
                className={number === page ? "current-page" : ""}
              >
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
