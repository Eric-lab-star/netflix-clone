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
interface ICompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ICountry {
  iso_3166_1: string;
  name: string;
}
interface ILanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ICompanies[];
  production_countries: ICountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ILanguage[];
  status: string;
  tagline: string;
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

interface IGenre {
  id: number;
  name: string;
}
export interface IGenres {
  genres: IGenre[];
}
export async function getNowPlaying() {
  const response = await fetch(
    `${BASEURL}/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`
  );
  const json = await response.json();
  return json;
}

export async function getUpComing() {
  const reponse = await fetch(
    `${BASEURL}/movie/upcoming?api_key=${APIKEY}&language=en-US&page=1`
  );
  const json = await reponse.json();
  return json;
}

export async function getPopular() {
  const response =
    await fetch(`${BASEURL}/movie/popular?api_key=${APIKEY}&language=en-US&page=1
  `);
  const json = await response.json();
  return json;
}

export async function getMovieDetail(movie_id: string) {
  const response = await fetch(
    `${BASEURL}/movie/${movie_id}?api_key=${APIKEY}&language=en-US`
  );
  const json = response.json();
  return json;
}

export async function getConfig() {
  const response = await fetch(`${BASEURL}/configuration?api_key=${APIKEY}`);
  const json = await response.json();
  return json;
}

export async function getGenre() {
  const response = await fetch(
    `${BASEURL}/genre/movie/list?api_key=${APIKEY}&language=en-US`
  );
  const json = await response.json();
  return json;
}

export async function getSearch(keyword: string) {
  const response = await fetch(
    `${BASEURL}/search/movie?api_key=${APIKEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  );
  const json = await response.json();
  return json;
}
