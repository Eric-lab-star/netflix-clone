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
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  console.log(state?.backgroundLocation);

  return (
    <Main>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="*" element={<div>nothing to show</div>} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/movieDetail/:id" element={<MovieDetail />} />
        </Routes>
      )}
    </Main>
  );
}

export default App;
