import React from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-32">
        <h1 className="text-black text-center text-6xl mt-20">Hello Vite</h1>
        <NewsList />
      </div>
    </>
  );
}

export default App;
