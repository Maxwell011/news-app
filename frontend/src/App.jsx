import React from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import TagNews from "./components/TagNews";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="pt-32 pb-32 pl-14">
                <h1 className="text-black text-9xl mt-20 uppercase text-justify">
                  We <br /> update <br /> the <br /> world
                </h1>
              </div>
              <NewsList />
            </>
          }
        />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/tag/:tag" element={<TagNews />} />
      </Routes>
    </>
  );
}

export default App;
