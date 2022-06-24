import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const PopUp = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: #fa3d3d75;
  position: absolute;
`;

export default function MovieDetail() {
  return (
    <PopUp initial={{ scale: 0 }} animate={{ scale: 1 }}>
      hello
    </PopUp>
  );
}
