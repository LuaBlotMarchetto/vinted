import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur XXXXXX REMPLACER XXXX",
      });

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: { title },
          amount: { price },
        }
      );

      console.log(response);

      if (response.data.status === "succeeded") {
        setCompleted(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return !completed ? (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isLoading}>
        Pay
      </button>
    </form>
  ) : (
    <span>Paiement effectué ! </span>
  );
};

export default CheckoutForm;
