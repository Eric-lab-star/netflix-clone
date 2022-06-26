import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Location from "./Location";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Logo from "./Logo";
import { SubmitHandler, useForm } from "react-hook-form";

const Nav = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.darker};
  font-size: 14px;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 10px 50px;
  z-index: 50;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  a {
    padding: 0 5px;
  }
`;

const Contents = styled.div`
  position: absolute;
`;

const SearchBtn = styled(motion.div)`
  display: inline-block;
  border-style: none;
  width: 1.5em;
  height: 1.5em;
  background-color: transparent;
  color: ${(props) => props.theme.white.lighter};
`;

const SearchInput = styled(motion.input)`
  :focus {
    border-style: none;
    outline: 1px solid ${(props) => props.theme.white.darker};
  }
  color: white;
  border-style: none;
  padding: 5px 24px;
  background-color: ${(props) => props.theme.black.lighter};
`;

const links = [
  { id: "Home", location: "/" },
  { id: `TV Shows`, location: "/tv" },
  { id: `Movies`, location: "/movies" },
  { id: `Trending`, location: "/trending" },
  { id: `My List`, location: "/myList" },
];
interface IForm {
  keyword: string;
}

export default function Header() {
  const { scrollYProgress } = useViewportScroll();
  const { register, handleSubmit } = useForm<IForm>();
  const location = useLocation();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(Boolean(false));
  const color = useTransform(
    scrollYProgress,
    [0, 0.08],
    [
      "linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30% )",
      "linear-gradient(rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%)",
    ]
  );
  const onClick = () => {
    setClicked((prev) => (prev = !prev));
  };
  const onSubmit: SubmitHandler<IForm> = (data) => {
    navigate(`search?keyword=${data.keyword}`);
  };
  return (
    <>
      <Nav style={{ background: color }}>
        <Column>
          <Link to={"/"}>
            <Logo />
          </Link>
          {links.map((link) => (
            <Location key={link.id} links={link} location={location} />
          ))}
        </Column>
        <Column>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchBtn animate={{ x: clicked ? 23 : 0 }} onClick={onClick}>
              <FontAwesomeIcon icon={solid("magnifying-glass")} />
            </SearchBtn>
            <AnimatePresence>
              {clicked && (
                <SearchInput
                  placeholder="Search by Title"
                  initial={{ width: 0 }}
                  animate={{ width: "15em" }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "tween" }}
                  {...register("keyword", { required: true })}
                />
              )}
            </AnimatePresence>
          </form>
        </Column>
      </Nav>
      <Contents>
        <Outlet />
      </Contents>
    </>
  );
}
