import { useState, useEffect } from "react";
import axios from "axios";
import Highlights from "../components/Highlights";
import Hero from "../components/Hero";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main>
      <Hero></Hero>
      <Highlights data={data} setData={setData}></Highlights>
    </main>
  );
};

export default Home;
