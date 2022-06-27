import { motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getTvDetail,
  IMovieDetail,
  IMovieResult,
  ITvDetail,
  ITvResult,
} from "../api";

const { innerWidth, innerHeight } = window;
const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1;
`;
const PopUp = styled(motion.div)`
  width: ${innerWidth / 1.9}px;
  height: ${innerHeight / 1.3}px;
  padding: 20px 20px;
  position: fixed;
  background-color: #c0392b;
  border-radius: 8px;
  z-index: 2;
  display: grid;
  gap: 10px;
  grid-template-rows: 2fr 1fr;
`;

const Img = styled.div<{ img: string }>`
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
`;
const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #e74c3c;
  padding: 10px;
  border-radius: 7px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  padding: 10px;
  box-sizing: border-box;
`;

const OverView = styled.div`
  word-break: break-all;
`;
const MetaInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  width: 34%;
  justify-content: center;
  &:last-child {
    justify-content: flex-end;
  }
  &:first-child {
    justify-content: flex-start;
  }
`;
const SubTitle = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;
const Content = styled.div`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 10px;
  margin-right: 10px;
  & span {
    margin: 3px 10px;
  }
`;

const Genre = styled.div`
  background-color: #e67e22;
  padding: 3px;
  border-radius: 3px;
`;

function Screen() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
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
  const { data: movieDetail } = useQuery<IMovieDetail>(
    ["movies", "detail"],
    () => getMovieDetail(id as string)
  );

  const { data: tvDetail } = useQuery<ITvDetail>(["tv", "detail"], () =>
    getTvDetail(id as string)
  );

  const location = useLocation();
  const state = location.state as {
    result: IMovieResult | ITvResult;
    img: string;
    genres: { id: number; name: string }[];
  };
  return (
    <>
      <Screen />
      <PopUp key="popup" initial={{ top: 70 }}>
        <Img img={state.img + state.result?.backdrop_path} />
        <MovieInfo>
          <MetaInfo>
            <Info>
              <Content>
                Release Date:
                {state.result?.release_date
                  ? state.result?.release_date
                  : state.result?.first_air_date}
              </Content>
            </Info>
            <Info>
              {state.genres.map((genre) => (
                <Content key={genre.id}>
                  <Genre>{genre.name}</Genre>
                </Content>
              ))}
            </Info>
            <Info>
              <Content>Score: {state.result?.vote_average}</Content>
            </Info>
          </MetaInfo>
          <Title>{state.result?.title}</Title>
          <OverView>
            <Content>{state.result?.overview}</Content>
          </OverView>
          {tvDetail?.homepage && movieDetail?.adult === undefined && (
            <Content>
              <a href={tvDetail?.homepage as string}>
                Visit Offical Website &rarr;
              </a>
            </Content>
          )}
          {movieDetail?.production_companies && tvDetail?.adult === undefined && (
            <>
              <SubTitle>Production Companies</SubTitle>
              <Content>
                {movieDetail?.production_companies.map((v) => (
                  <span key={v.name}>{v.name}</span>
                ))}
              </Content>
            </>
          )}
          {movieDetail?.homepage && tvDetail?.adult === undefined && (
            <Content>
              <a href={movieDetail?.homepage as string}>
                Visit Offical Website &rarr;
              </a>
            </Content>
          )}
        </MovieInfo>
      </PopUp>
    </>
  );
}
