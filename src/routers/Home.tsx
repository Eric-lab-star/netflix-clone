import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getConfig,
  getLatestMoives,
  getNowPlaying,
  getPopular,
  getUpComing,
  IConfig,
  IMovies,
} from "../api";
import FooterComponent from "../components/Footer";
import Logo from "../components/Logo";
import SliderComponent from "../components/Slider";

const Main = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const BigImg = styled.div<{ backgroundImg: string }>`
  width: 100%;
  height: 90vh;
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
  left: 45%;
  top: 100px;
  width: 10vw;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  top: 70vh;
`;

const randomNum = Math.floor(Math.random() * 20);

export default function Home() {
  //APIs
  const { data: nowPlaying, isLoading: isMovieData } = useQuery<IMovies>(
    ["movies", "now_playing"],
    getNowPlaying
  );
  const { data: upComing, isLoading: isUpcoming } = useQuery<IMovies>(
    ["movies", "upComing"],
    getUpComing
  );
  const { data: popular, isLoading: isPopular } = useQuery<IMovies>(
    ["movies", "popluar"],
    getPopular
  );
  const { data: latest, isLoading: isLatetes } = useQuery<IMovies>(
    ["movies", "latest"],
    getLatestMoives
  );
  const { data: config, isLoading: isConfig } = useQuery<IConfig>(
    "config",
    getConfig
  );

  const imgBaseUrl = config?.images.base_url;
  const posterSize = config?.images.poster_sizes[5];
  const backdropSize3 = config?.images.backdrop_sizes[3];
  const backdropImgURL = nowPlaying?.results[randomNum].backdrop_path;

  return (
    <Main>
      {isMovieData && isConfig && isUpcoming && isPopular && isLatetes ? (
        <Loading>
          <Logo />
        </Loading>
      ) : (
        <>
          {nowPlaying ? (
            <BigImg
              backgroundImg={`${imgBaseUrl}${backdropSize3}${backdropImgURL}`}
            >
              <Title>{nowPlaying.results[randomNum].title}</Title>
              <MovieDetail>
                {nowPlaying.results[randomNum].overview.length < 100
                  ? nowPlaying.results[randomNum].overview
                  : nowPlaying.results[randomNum].overview.slice(0, 100) +
                    "..."}
              </MovieDetail>
            </BigImg>
          ) : null}
          <Content>
            <SliderComponent sliderName={"Now Playing"} data={nowPlaying} />
            <SliderComponent sliderName={"Upcoming"} data={upComing} />
            <SliderComponent sliderName={"Popular"} data={popular} />
            <SliderComponent sliderName={"Latest Movie"} data={latest} />
            <FooterComponent />
          </Content>
        </>
      )}
    </Main>
  );
}
