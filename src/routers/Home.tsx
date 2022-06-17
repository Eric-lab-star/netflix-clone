import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getConfig, getMovies, IConfig, IMovies } from "../api";
import Logo from "../components/Logo";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BigImg = styled.div<{ backgroundImg: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-image: url(${(props) => props.backgroundImg});
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
  width: 30em;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Loading = styled(motion.svg)`
  width: 20vw;
`;

export default function Home() {
  const randomNum = Math.floor(Math.random() * 20);
  const { data: movieData, isLoading: isMovieData } = useQuery<IMovies>(
    ["movies", "now_playing"],
    getMovies
  );
  const { data: config, isLoading: isConfig } = useQuery<IConfig>(
    "config",
    getConfig
  );

  const imgBaseUrl = config?.images.base_url;
  const backdropSize = config?.images.backdrop_sizes[3];
  const backdropImgURL = movieData?.results[randomNum].backdrop_path;

  return (
    <Main>
      {isMovieData && isConfig ? (
        <Loading>
          <Logo />
        </Loading>
      ) : (
        <>
          <BigImg
            backgroundImg={`${imgBaseUrl}${backdropSize}${backdropImgURL}`}
          >
            <Title>{movieData?.results[randomNum].title}</Title>
            <MovieDetail>{movieData?.results[randomNum].overview}</MovieDetail>
          </BigImg>
        </>
      )}
    </Main>
  );
}
