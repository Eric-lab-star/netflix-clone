import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IMovies } from "../api";

const Slider = styled.div`
  position: relative;
  bottom: 90px;
  left: 30px;
`;

const SliderGrid = styled(motion.div)`
  display: grid;
  position: absolute;
  width: 95%;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  position: absolute;
`;

const Vcarousel = {
  hidden: {
    x: window.innerWidth,
  },
  show: { x: 0 },
  exit: {
    x: -window.innerWidth,
  },
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
  const onClick = () => {
    setVisible((prev) => (prev += 7));
  };

  const onMouseEnter = () => {
    console.log("hello");
  };

  const [visible, setVisible] = useState(6);
  const getSlider = () => {
    const newArray = [];
    const movieResults = movieData?.results;
    for (let i = 0; i < 6; i++) {
      newArray.unshift(movieResults?.[(visible - i) % movieResults?.length]);
    }
    return newArray;
  };
  return (
    <Slider onMouseEnter={onMouseEnter}>
      <AnimatePresence>
        <SliderGrid
          key={visible}
          variants={Vcarousel}
          animate="show"
          initial="hidden"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {getSlider()?.map((v, i) => (
            <Box key={v?.id}>
              <img
                width="200px"
                src={`${imgBaseUrl}${posterSize}` + v?.poster_path}
                alt="error"
              />
            </Box>
          ))}
        </SliderGrid>
      </AnimatePresence>
      <Button onClick={onClick}>Next</Button>
    </Slider>
  );
}
