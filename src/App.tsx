import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./routers/Home";
import Movies from "./screens/Movies";
import MyList from "./screens/MyList";
import Trending from "./screens/Trending";
import Search from "./routers/Search";
import Tv from "./routers/Tv";
import Header from "./components/Header";
import styled from "styled-components";
import MovieDetail from "./screens/MovieDetail";

window.onbeforeunload = function () {
  window.scroll(0, 0);
};

const Main = styled.div`
  width: 100vw;
  height: 110vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  return (
    <Main>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="tv/detail/:id" element={<MovieDetail />} />
          <Route path="movie/detail/:id" element={<MovieDetail />} />
          <Route path="search/detail/:id" element={<MovieDetail />} />
          <Route path="*" element={<div>nothing to show</div>} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="tv/detail/:id" element={<MovieDetail />} />
          <Route path="movie/detail/:id" element={<MovieDetail />} />
          <Route path="search/detail/:id" element={<MovieDetail />} />
        </Routes>
      )}
    </Main>
  );
}

export default App;
