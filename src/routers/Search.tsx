import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch, getSearchTv } from "../api";
import SliderComponent from "../components/Slider";

const Main = styled.div`
  width: 100vw;
  position: relative;
  top: 100px;
`;

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: search, isLoading: isMovieSearch } = useQuery(
    ["movies", "search"],
    () => getSearch(params.get("keyword") as string)
  );
  const { data: tvSearch, isLoading: isTvSearch } = useQuery(
    ["tv", "search"],
    () => getSearchTv(params.get("keyword") as string)
  );
  const keyword = params.get("keyword");

  return (
    <Main>
      {!isMovieSearch && (
        <>
          <SliderComponent data={search} sliderName={"Filterd Movies"} />
          <SliderComponent data={tvSearch} sliderName={"Filterd TVs"} />
        </>
      )}
    </Main>
  );
}
