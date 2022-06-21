import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getConfig, getMovies, IConfig, IMovies, IResult } from "../api";
import Logo from "../components/Logo";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BigImg = styled.div<{ backgroundImg: string }>`
  width: 100%;
  height: 80%;
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
  width: 20vw;
`;

const Carousel = styled(motion.div)`
  z-index: 1;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  top: 70%;
`;

const Vcarousel = {
  hidden: {
    x: window.innerWidth,
  },
  show: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth,
  },
};

const Button = styled.button`
  position: absolute;
  top: 200px;
`;
const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
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
  const [visible, setVisible] = useState(6);
  const getSlider = () => {
    const newArray = [];
    const movieResults = movieData?.results;
    for (let i = 0; i < 7; i++) {
      newArray.unshift(movieResults?.[(visible - i) % movieResults?.length]);
    }
    return newArray;
  };
  const onClick = () => {
    setVisible((prev) => (prev += 7));
  };
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

          <Carousel>
            <AnimatePresence>
              {getSlider()?.map((v, i) => (
                <Box
                  variants={Vcarousel}
                  animate="show"
                  initial="hidden"
                  exit="exit"
                  transition={{ type: "tween", duration: 4 }}
                  key={v?.id}
                >
                  <img
                    width="180px"
                    src={`${imgBaseUrl}${posterSize}` + v?.poster_path}
                    alt="error"
                  />
                </Box>
              ))}
            </AnimatePresence>
          </Carousel>
          {/* <Carousel>{visibleMovies?.map(v=><Box>{v.}</Box>)}</Carousel> */}
          <Button onClick={onClick}>Next</Button>
        </>
      )}
    </Main>
  );
}
