import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  let deliveryFees = price / 5;
  let protectionFees = price / 10;
  let total = price + deliveryFees + protectionFees;

  return token ? (
    <main>
      <div className="payment-container">
        <div>
          <div>
            <h3> Résumé de la commande</h3>
          </div>
          <div>
            <div>
              <p>Commande</p>
              <p>{price} €</p>
            </div>
            <div>
              <p>Frais protection acheteurs</p>
              <p>{protectionFees} €</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>{deliveryFees} €</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h4>Total</h4>
              <h4>{total} €</h4>
            </div>
            <div>
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir {title}.
                Vous allez payer {total}€ (frais de protection et frais de port
                inclus).
              </p>
            </div>
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} price={price}></CheckoutForm>
        </Elements>
      </div>
    </main>
  ) : (
    <Navigate to="login" />
  );
};

export default Payment;
