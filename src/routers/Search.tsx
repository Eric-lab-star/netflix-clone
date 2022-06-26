import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearch } from "../api";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log(params.get("keyword"));
  const { data, isLoading } = useQuery(["movies", "search"], () =>
    getSearch(params.get("keyword") as string)
  );
  if (!isLoading) {
    console.log(data.results);
  }
  return <div>Search</div>;
}
