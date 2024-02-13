import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS, FETCH_MOVIE_LIST_API } from "../utils/constants";

const Browse = () => {
  const fetchMovieList = async () => {
    const data = await fetch(FETCH_MOVIE_LIST_API, API_OPTIONS);
    const json = await data.json();
    console.log(json.results);
  };
  useEffect(() => {
    fetchMovieList();
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
