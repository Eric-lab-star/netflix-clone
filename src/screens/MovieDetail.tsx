import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { IResult } from "../api";

const PopUp = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: #fa3d3d75;
  position: absolute;
  z-index: 2;
`;

const Overlay = styled(motion.div)`
  display: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1;
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
  const state = location.state as { movie: IResult };
  console.log(state);
  return (
    <AnimatePresence>
      <Screen />
      <PopUp
        key="popup"
        initial={{ top: scrollY.get() + 200 }}
        layoutId={id + ""}
      >
        <div>{state.movie.title}</div>
      </PopUp>
    </AnimatePresence>
  );
}
