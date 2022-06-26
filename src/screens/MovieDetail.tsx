import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { IResult } from "../api";

const { innerWidth, innerHeight } = window;
const Overlay = styled(motion.div)`
  display: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1;
`;
const PopUp = styled(motion.div)`
  width: ${innerWidth / 2}px;
  height: ${innerHeight / 2.5}px;
  position: absolute;
  background-color: black;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const Img = styled.div<{ img: string }>`
  background-image: ${(props) => `url(${props.img})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;
`;
const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  padding: 10px;
  box-sizing: border-box;
`;

const OverView = styled.div``;
const MetaInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  width: 30%;
`;
const SubTitle = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;
const Content = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

const Genre = styled.div`
  font-size: 15px;
  display: inline-block;
  margin-right: 10px;
`;

function Screen() {
  const path = useMatch("movieDetail/:id");
  const navigate = useNavigate();
  const onClick = () => {
    if (path) navigate(-1);
  };
  return (
    <Overlay
      key="overlay"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
    />
  );
}

export default function MovieDetail() {
  const { id } = useParams();
  const { scrollY } = useViewportScroll();
  const location = useLocation();
  const state = location.state as {
    movie: IResult;
    img: string;
    genres: { id: number; name: string }[];
  };
  return (
    <AnimatePresence>
      <Screen />
      <PopUp
        key="popup"
        initial={{ top: scrollY.get() + 200 }}
        layoutId={id + ""}
      >
        <Img img={state.img + state.movie.poster_path} />
        <MovieInfo>
          <Title>{state.movie.title}</Title>
          <OverView>
            <SubTitle>Overview</SubTitle>
            <Content>{state.movie.overview}</Content>
          </OverView>
          <MetaInfo>
            <Info>
              <SubTitle>Released Date</SubTitle>
              <Content>{state.movie.release_date}</Content>
            </Info>
            <Info>
              <SubTitle>Genres</SubTitle>
              {state.genres.map((genre) => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Info>
            <Info>
              <SubTitle>Vote Average</SubTitle>
              <Content>{state.movie.vote_average}</Content>
            </Info>
          </MetaInfo>
        </MovieInfo>
      </PopUp>
    </AnimatePresence>
  );
}
