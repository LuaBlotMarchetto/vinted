import { useState } from "react";
import Highlights from "../components/Highlights";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();

  const { limit, page } = useParams();

  return (
    <main>
      <Hero></Hero>
      <Highlights
        data={data}
        setData={setData}
        limit={limit}
        page={page}
      ></Highlights>
    </main>
  );
};

export default Home;
