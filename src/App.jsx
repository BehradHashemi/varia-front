import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/Home/HomePage";
import { useState, useEffect } from "react";
import Loading from "./Loading";

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

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
