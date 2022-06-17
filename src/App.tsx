import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routers/Home";
import Movies from "./screens/Movies";
import MyList from "./screens/MyList";
import Trending from "./screens/Trending";
import Search from "./routers/Search";
import Tv from "./routers/Tv";
import Header from "./components/Header";
import styled from "styled-components";

const Main = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
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
