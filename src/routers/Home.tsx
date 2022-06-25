import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getConfig, getMovies, IConfig, IMovies } from "../api";
import Logo from "../components/Logo";
import SliderComponent from "../components/Slider";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BigImg = styled.div<{ backgroundImg: string }>`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.backgroundImg});
  background-size: cover;
`;

const Title = styled.h1`
  padding-left: 60px;
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 900;
`;
const MovieDetail = styled.div`
  padding-left: 60px;
  font-size: 22px;
  width: 20em;
`;
const Loading = styled(motion.svg)`
  position: relative;
  left: 40%;
  top: 40%;
  width: 20vw;
`;

const randomNum = Math.floor(Math.random() * 20);

export default function Home() {
  const { data: movieData, isLoading: isMovieData } = useQuery<IMovies>(
    ["movies", "now_playing"],
    getMovies
  );
  const { data: config, isLoading: isConfig } = useQuery<IConfig>(
    "config",
    getConfig
  );
  const imgBaseUrl = config?.images.base_url;
  const backdropSize3 = config?.images.backdrop_sizes[3];
  const posterSize = config?.images.poster_sizes[3];
  const backdropImgURL = movieData?.results[randomNum].backdrop_path;

  return (
    <Main>
      {isMovieData && isConfig ? (
        <Loading>
          <Logo />
        </Loading>
      ) : (
        <>
          {movieData ? (
            <BigImg
              backgroundImg={`${imgBaseUrl}${backdropSize3}${backdropImgURL}`}
            >
              <Title>{movieData.results[randomNum].title}</Title>
              <MovieDetail>
                {movieData.results[randomNum].overview.length < 100
                  ? movieData.results[randomNum].overview
                  : movieData.results[randomNum].overview.slice(0, 100) + "..."}
              </MovieDetail>
            </BigImg>
          ) : null}
          <SliderComponent
            movieData={movieData}
            imgBaseUrl={imgBaseUrl}
            posterSize={posterSize}
          />
        </>
      )}
    </Main>
  );
}
