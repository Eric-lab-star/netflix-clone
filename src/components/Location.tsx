import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Diamond = styled(motion.div)`
  width: 0.7em;
  height: 0.7em;
  position: absolute;
  z-index: -1;
`;

const LinkBox = styled(motion.div)`
  width: 5.3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;
function DiamondPointer() {
  return (
    <Diamond
      style={{ y: -16 }}
      layoutId="pointer"
      transition={{ duration: 0.5 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="red">
        <path d="M500.3 227.7C515.9 243.3 515.9 268.7 500.3 284.3L284.3 500.3C268.7 515.9 243.3 515.9 227.7 500.3L11.72 284.3C-3.905 268.7-3.905 243.3 11.72 227.7L227.7 11.72C243.3-3.905 268.7-3.905 284.3 11.72L500.3 227.7z" />
      </svg>
    </Diamond>
  );
}

export default function Location({ links, location }: any) {
  return (
    <LinkBox>
      <Link to={links.location}>{links.id}</Link>
      {location.pathname === links.location ? <DiamondPointer /> : null}
    </LinkBox>
  );
}
