import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../screens/Header";

const Main = styled.div`
  width: 100vw;
  height: 400vh;
`;

export default function Home() {
  return (
    <Main>
      <Header />
    </Main>
  );
}
