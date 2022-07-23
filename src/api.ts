const APIKEY = "06ad24f20ddddf36191cdf82e51a81ee";
const BASEURL = "https://api.themoviedb.org/3";

export interface IMovieResult {
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
  name?: string;
  video: false;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
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

export interface IMovieDetail {
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
  success?: boolean;
}

export interface IMovies {
  date: {
    maximum: string;
    minimum: string;
  };
  results: IMovieResult[];
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

export interface ITvDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: IGenre[];
  homepage: string;
  id: number;
  in_production: true;
  languages: string[];
  last_air_date: string;
  name: string;
  poster_path: string;
  production_companies: ICompanies[];
  production_countries: ICountry[];
  spoken_languages: ILanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  success?: boolean;
}

export interface ITvResult {
  release_date?: string;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  title?: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface ITvOnair {
  page: number;
  results: ITvResult[];
  total_pages: number;
  total_results: number;
}

interface IGenre {
  id: number;
  name: string;
}

export interface IGenres {
  genres: IGenre[];
}

export interface ITvPopular {
  page: number;
  results: ITvResult[];
  total_pages: number;
  total_results: number;
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

export async function getSearchTv(keyword: string) {
  const response = await fetch(
    `${BASEURL}/search/tv?api_key=${APIKEY}&language=en-US&page=1&query=${keyword}&include_adult=false`
  );
  const json = await response.json();
  return json;
}

export async function getTvOnair() {
  const response = await fetch(
    `${BASEURL}/tv/on_the_air?api_key=${APIKEY}&language=en-US&page=1`
  );
  const json = await response.json();
  return json;
}

export async function getTvDetail(id: string) {
  const response = await fetch(
    `${BASEURL}/tv/${id}?api_key=${APIKEY}&language=en-US`
  );
  const json = response.json();
  return json;
}

export async function getTvPopular() {
  const response = await fetch(
    `${BASEURL}/tv/popular?api_key=${APIKEY}&language=en-US&page=1`
  );
  const json = await response.json();
  return json;
}

export async function getTvTop() {
  const response = await fetch(
    `${BASEURL}/tv/top_rated?api_key=${APIKEY}&language=en-US&page=1`
  );
  const json = response.json();
  return json;
}

export async function getLatestMoives() {
  const today = Date.now();
  const response = await fetch(
    `${BASEURL}/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&year=2022&release_date.lte=${today}`
  );
  const json = await response.json();
  return json;
}
export async function getLatestTvs() {
  const now = Date.now();
  const response = await fetch(
    `${BASEURL}/discover/tv?api_key=${APIKEY}&language=en-US&sort_by=first_air_date.desc&first_air_date.lte=${now}&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
  );
  const json = response.json();
  return json;
}
