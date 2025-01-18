import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/Home/HomePage";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Footer from "./components/layout/Footer";
import styled from "styled-components";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 123) {
        event.preventDefault();
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <>
        <Header></Header>
        <Loading />
      </>
    );
  }
  const Div = styled.div`
    width: 100%;
    background: #ffffff;
    text-align: center;
  `;
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer></Footer>
      <Div>
        <h4>
          طراحی شده با ❤️ توسط{" "}
          <a href="https://behrad.liara.run">بهراد هاشمی</a>
        </h4>
      </Div>
    </>
  );
}

export default App;
