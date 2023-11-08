import Highlights from "../components/Highlights";
import Hero from "../components/Hero";

const Home = ({ data, setData }) => {
  return (
    <main>
      <Hero></Hero>
      <Highlights data={data} setData={setData}></Highlights>
    </main>
  );
};

export default Home;
