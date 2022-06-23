import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./routers/Home";
import Movies from "./screens/Movies";
import MyList from "./screens/MyList";
import Trending from "./screens/Trending";
import Search from "./routers/Search";
import Tv from "./routers/Tv";
import Header from "./components/Header";
import styled from "styled-components";

window.onbeforeunload = function () {
  window.scroll(0, 0);
};

const Main = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Main>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/myList" element={<MyList />} />
        </Route>
      </Routes>
    </Main>
  );
}

export default App;
