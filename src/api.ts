const APIKEY = "06ad24f20ddddf36191cdf82e51a81ee";
const BASEURL = "https://api.themoviedb.org/3";

export interface IResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface IMovies {
  date: {
    maximum: string;
    minimum: string;
  };
  results: IResult[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IConfig {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export async function getMovies() {
  const response = await fetch(
    `${BASEURL}/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`
  );
  const json = await response.json();
  return json;
}

export async function getConfig() {
  const response = await fetch(`${BASEURL}/configuration?api_key=${APIKEY}`);
  const json = await response.json();
  return json;
}
