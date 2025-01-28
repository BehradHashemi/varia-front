import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/Home/HomePage";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Footer from "./components/layout/Footer";
import Register from "./components/shared/Authentication/Register";
import LoginForm from "./components/shared/Authentication/Login";

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
    }, 1300);
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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer></Footer>
      <div
        style={{
          width: "100%",
          background: "#ffffff",
          textAlign: "center",
        }}
      >
        <h4>
          طراحی شده با ❤️ توسط{" "}
          <a href="https://behrad.liara.run" target="_blank">
            بهراد هاشمی
          </a>
        </h4>
      </div>
    </>
  );
}

export default App;
