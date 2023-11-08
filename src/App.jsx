import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";

//COMPOSANTS
import Header from "./components/Header";
import Highlights from "./components/Highlights";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Header></Header>
        <main>
          <Hero></Hero>
          <Highlights></Highlights>
        </main>
        <Footer></Footer>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/offer" element={<Offer />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
