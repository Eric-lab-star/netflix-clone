import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getGenre, IGenres, IMovies, IResult } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useQuery } from "react-query";
const PosterHeight = 360;
const SliderName = styled.div`
  position: relative;
  top: 20px;
  left: 50px;
  font-size: 20px;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${PosterHeight + "px"};
  width: 100%;
  margin: 40px 0px;
  &:first-child {
    margin: 0px;
  }
`;

const SliderGrid = styled(motion.div)`
  display: grid;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: ${PosterHeight}px;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);
`;

const PosterBox = styled(motion.div)<{ imgsrc: String }>`
  background-image: ${(props) => `url(${props.imgsrc})`};
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  & :last-child {
    transform-origin: center right;
  }
`;

const ButtonBox = styled.div`
  background: linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  color: black;
  position: absolute;
  height: ${PosterHeight + 20}px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  & button {
    border-style: none;
    background-color: transparent;
    color: ${(props) => props.theme.white.darker};
    font-size: 30px;
  }
`;

const HoveredBox = styled(motion.div)`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  background-color: black;
  position: absolute;
  top: ${PosterHeight}px;
  padding: 5px;
`;

const MovieInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: -30px;
`;
const Vote = styled.div``;

const GenreBox = styled.div`
  display: flex;
  align-items: center;
`;
const Genre = styled.div`
  padding: 2px;
  white-space: nowrap;
  border-radius: 3px;
  background-color: #686de0;
  color: #30336b;
  font-size: 10px;
  margin: 0 2.5px;
`;
const Title = styled.div`
  padding: 3px;
  margin-bottom: 5px;
  font-size: 13px;
`;
const LeftBtn = styled(ButtonBox)<{ isHover: Boolean }>`
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  left: 0px;
  width: 50px;
`;

const RightBtn = styled(ButtonBox)<{ isHover: Boolean }>`
  background: linear-gradient(-90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  right: 0px;
  width: 50px;
`;

const VSlider = {
  hidden: (isLeft: Boolean) => ({
    x: isLeft ? -window.innerWidth - 10 : window.innerWidth + 10,
  }),
  show: { x: 0 },
  exit: (isLeft: Boolean) => ({
    x: isLeft ? window.innerWidth + 10 : -window.innerWidth - 10,
  }),
};

interface ISliderProps {
  movieData?: IMovies;
  imgBaseUrl?: string;
  posterSize?: string;
  sliderName?: string;
}

export default function SliderComponent({
  movieData,
  imgBaseUrl,
  posterSize,
  sliderName,
}: ISliderProps) {
  //var
  const [isHover, setIsHover] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [visible, setVisible] = useState(5);
  const [isExit, setIsExit] = useState(false);
  const [layoutId, setLayoutId] = useState("");
  const { data: genreObj, isLoading: isGenreObjLoading } = useQuery<IGenres>(
    ["movies", "genres"],
    getGenre
  );
  const [chartOption, setChartOption] = useState<ApexCharts.ApexOptions>();
  const [chartSeries, setChartSeries] = useState<number[]>();

  const navigate = useNavigate();
  const location = useLocation();
  //set chart option
  useEffect(
    () =>
      setChartOption({
        fill: {
          type: "solid",
          colors: ["#F44336", "#921b43"],
        },
        stroke: {
          width: 1,
          colors: ["black"],
        },
        chart: {
          offsetX: -20,
          type: "donut",
        },
        legend: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              labels: {
                show: true,
                name: {
                  show: false,
                  fontSize: "12px",
                },
                value: {
                  fontSize: " 12px",
                  color: "white",
                  offsetY: 5,
                },
                total: {
                  show: true,
                  showAlways: true,
                  formatter: function (w) {
                    return w.config.series[0];
                  },
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "10px",
          },
        },
      }),
    []
  );

  // utility fn
  const onRightBtn = () => {
    if (isExit) return;
    setIsLeft(false);
    toggleExit();
    setVisible((prev) => (prev += 6));
  };
  const onLeftBtn = () => {
    if (isExit) return;
    if (visible === 6) return;
    setIsLeft(true);
    toggleExit();
    setVisible((prev) => (prev -= 6));
  };
  const showBtn = () => {
    setIsHover(true);
  };
  const hideBtn = () => {
    setIsHover(false);
  };
  const setPosterConfig = (movie: IResult) => {
    setLayoutId(movie.id + "");
    setChartSeries([movie.vote_average, 10 - movie.vote_average]);
  };
  const toggleExit = () => setIsExit((prev) => !prev);
  const getSlider = () => {
    if (movieData) {
      const newArray = [];
      const movieResults = movieData.results;
      for (let i = 0; i < 6; i++) {
        newArray.unshift(movieResults?.[(visible - i) % movieResults.length]);
      }
      return newArray;
    }
    return;
  };
  const onMouseLeave = () => {
    setLayoutId("");
  };
  const clickPoster = (v: IResult) => {
    navigate(`/movieDetail/${v.id}`, {
      state: {
        backgroundLocation: location,
        movie: v,
        img: `${imgBaseUrl}${posterSize}`,
        genres: getGenreString(v.genre_ids),
      },
    });
  };

  const getGenreString = (inputIdArray: Number[]) => {
    if (isGenreObjLoading) return;
    if (genreObj) {
      const genreObjArray = genreObj.genres;
      const filteredId = genreObjArray.filter((obj) => {
        const result = inputIdArray.filter((id) => id === obj.id);
        return result[0];
      });

      return filteredId.length > 2 ? filteredId.slice(0, 2) : filteredId;
    }
    return;
  };

  //renderer
  return (
    <LayoutGroup id={Date.now() + ""}>
      <SliderName>{sliderName}</SliderName>
      <Slider onMouseEnter={showBtn} onMouseLeave={hideBtn}>
        <AnimatePresence
          custom={isLeft}
          initial={false}
          onExitComplete={toggleExit}
        >
          <SliderGrid
            custom={isLeft}
            key={visible}
            variants={VSlider}
            animate="show"
            initial="hidden"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {getSlider()?.map((v, i) => (
              <PosterBox
                layoutId={v.id + ""}
                onClick={() => clickPoster(v)}
                key={v.id}
                onMouseEnter={() => setPosterConfig(v)}
                onMouseLeave={onMouseLeave}
                whileHover={{ scale: 1.1, zIndex: 1 }}
                imgsrc={`${imgBaseUrl}${posterSize}` + v.poster_path}
              >
                {parseInt(layoutId) === v.id && (
                  <HoveredBox>
                    <Vote>
                      <Chart
                        options={chartOption}
                        series={chartSeries}
                        type="donut"
                        width="100%"
                      />
                    </Vote>
                    <MovieInfoBox>
                      <Title>{v.title}</Title>
                      <GenreBox>
                        {getGenreString(v.genre_ids)?.map((obj) => (
                          <Genre key={obj.id}>{obj.name}</Genre>
                        ))}
                      </GenreBox>
                    </MovieInfoBox>
                  </HoveredBox>
                )}
              </PosterBox>
            ))}
          </SliderGrid>
        </AnimatePresence>

        <LeftBtn isHover={isHover}>
          <button onClick={onLeftBtn}>
            <FontAwesomeIcon icon={solid("chevron-left")} />
          </button>
        </LeftBtn>
        <RightBtn isHover={isHover}>
          <button onClick={onRightBtn}>
            <FontAwesomeIcon icon={solid("chevron-right")} />
          </button>
        </RightBtn>
      </Slider>
    </LayoutGroup>
  );
}
