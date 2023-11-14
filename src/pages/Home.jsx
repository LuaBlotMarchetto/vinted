import { useState } from "react";
import Highlights from "../components/Highlights";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";

const Home = ({ search }) => {
  document.body.style.backgroundColor = "white";
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
