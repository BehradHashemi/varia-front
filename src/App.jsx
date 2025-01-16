import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./components/Home/HomePage";

function App() {
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
