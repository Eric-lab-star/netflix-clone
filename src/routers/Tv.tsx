import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getConfig,
  getTvOnair,
  getTvPopular,
  getTvTop,
  IConfig,
  ITvOnair,
  ITvPopular,
} from "../api";
import FooterComponent from "../components/Footer";
import Logo from "../components/Logo";
import SliderComponent from "../components/Slider";

const Main = styled.div`
  width: 100vw;
  position: relative;
  top: 100px;
`;

const Loading = styled.div`
  width: 100vw;
  text-align: center;
`;

export default function Tv() {
  const { data: onair, isLoading: isOnair } = useQuery<ITvOnair>(
    ["tv", "onair"],
    getTvOnair
  );
  const { data: popuar, isLoading: isPopular } = useQuery<ITvPopular>(
    ["tv", "popular"],
    getTvPopular
  );
  const { data: top, isLoading: isTop } = useQuery<ITvPopular>(
    ["tv", "top"],
    getTvTop
  );
  const { data: config, isLoading: isConfig } = useQuery<IConfig>(
    ["config"],
    getConfig
  );

  const imgBaseUrl = config?.images.base_url;
  const posterSize = config?.images.poster_sizes[5];

  return (
    <Main>
      {isOnair && isConfig && isPopular && isTop ? (
        <Loading>
          <Logo />
        </Loading>
      ) : (
        <>
          <SliderComponent
            data={onair}
            imgBaseUrl={imgBaseUrl}
            posterSize={posterSize}
            sliderName={"OnAir"}
          />
          <SliderComponent
            data={popuar}
            imgBaseUrl={imgBaseUrl}
            posterSize={posterSize}
            sliderName={"Popular TVs"}
          />
          <SliderComponent
            data={top}
            imgBaseUrl={imgBaseUrl}
            posterSize={posterSize}
            sliderName={"Top Rated"}
          />
          <FooterComponent />
        </>
      )}
    </Main>
  );
}
