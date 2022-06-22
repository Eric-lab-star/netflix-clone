import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IMovies } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const PosterHeight = 360;
const Slider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderGrid = styled(motion.div)`
  display: grid;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: ${PosterHeight}px;
  gap: 10px;
  grid-template-columns: repeat(7, 1fr);
`;

const PosterBox = styled(motion.div)<{ imgsrc: String }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => `url(${props.imgsrc})`};
  background-size: cover;
  background-position: center center;
`;

const ButtonBox = styled.div`
  background: linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  color: black;
  position: absolute;
  height: ${PosterHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    border-style: none;
    background-color: transparent;
    color: ${(props) => props.theme.white.darker};
    font-size: 30px;
  }
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
  movieData: IMovies | undefined;
  imgBaseUrl: string | undefined;
  posterSize: string | undefined;
}

export default function SliderComponent({
  movieData,
  imgBaseUrl,
  posterSize,
}: ISliderProps) {
  //var
  const [isHover, setIsHover] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [visible, setVisible] = useState(6);
  const [isExit, setIsExit] = useState(false);
  // utility fn
  const onRightBtn = () => {
    if (isExit) return;
    setIsLeft(false);
    toggleExit();
    setVisible((prev) => (prev += 7));
  };
  const onLeftBtn = () => {
    if (isExit) return;
    if (visible === 6) return;
    setIsLeft(true);
    toggleExit();
    setVisible((prev) => (prev -= 7));
  };
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  const toggleExit = () => setIsExit((prev) => !prev);

  const getSlider = () => {
    const newArray = [];
    const movieResults = movieData?.results;
    for (let i = 0; i < 7; i++) {
      newArray.unshift(movieResults?.[(visible - i) % movieResults?.length]);
    }
    return newArray;
  };

  //renderer
  return (
    <Slider onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
              key={v?.id}
              imgsrc={`${imgBaseUrl}${posterSize}` + v?.poster_path}
            />
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
  );
}
