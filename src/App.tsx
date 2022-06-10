import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routers/Home";

import Search from "./routers/Search";
import Tv from "./routers/Tv";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
