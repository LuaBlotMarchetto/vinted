import { useState } from "react";
import Highlights from "../components/Highlights";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";

const Home = ({ search }) => {
  // const [data, setData] = useState();

  // const { limit, page } = useParams();

  return (
    <main>
      <Hero></Hero>
      <Highlights
        // data={data}
        // setData={setData}
        // limit={limit}
        // page={page}
        search={search}
      ></Highlights>
    </main>
  );
};

export default Home;
