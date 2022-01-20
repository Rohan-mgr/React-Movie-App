import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "axios";
import { genres } from "../Genre/genre";

const tmdb_api = process.env.REACT_APP_TMDB_API;
const baseUrl = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/original/";
function Banner() {
  const [movie, setMovie] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      let response = await axios.get(
        `${baseUrl}discover/movie?api_key=${tmdb_api}&language=en-US`
      );
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    }
    fetchMovies();
  }, []);
  function truncate(str, n) {
    return str?.length >= 150 ? str.substring(0, n - 1) + "..." : str;
  }

  function handleParagraphClick(movie) {
    setSearchResults([]);
    document.getElementById("searchBox").value = movie.title;
    axios
      .get(`${baseUrl}movie/${movie.id}?&api_key=${tmdb_api}&language=en-Us`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }

  async function searchMovie(searchString) {
    const response = await axios.get(
      `${baseUrl}search/movie?api_key=${tmdb_api}&query=${searchString}&language=en-US`
    );
    // setMovie(response.data.results);
    setSearchResults(response.data.results);
  }

  const handleSearchedMovie = (e) => {
    if (e.target.value === "") {
      setSearchResults([]);
    } else {
      searchMovie(e.target.value);
    }
  };

  function checkGenres(genreArray) {
    let genreList = genreArray?.map((num) => {
      return genres?.find((genre) => genre.id === num);
    });
    return genreList?.map((genre) => genre.name).join(", ");
  }
  return (
    <>
      <div
        className="Banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `${
            movie?.backdrop_path
              ? `url("${imgUrl}${movie?.backdrop_path}")`
              : `url(
                "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
              )`
          }`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__fadeTop"></div>
        <div className="Banner__contents">
          <div className="overlay"></div>
          <div className="Banner__header">
            <img
              className="tmdb__logo"
              src="https://filmboard.mtu.edu/static/bucket/923aeb4a2b10f3e3cd793b3bde595df83c818cd5a4ea5d71486438f4b063c63ffa48fd6bc166ede140cd3d1f0a5e5c5db7388b63d1af96c9c69ebdce2c833acf.png"
              alt="tmdb-logo"
            />
            <input
              id="searchBox"
              type="text"
              onChange={(e) => handleSearchedMovie(e)}
              placeholder="Search Movie Title..."
            />
          </div>
          {searchResults?.length !== 0 ? (
            <div className="filter__searchItems">
              {searchResults?.slice(0, 10).map((movie) => {
                return (
                  <p key={movie.id} onClick={() => handleParagraphClick(movie)}>
                    {movie.title}
                  </p>
                );
              })}
            </div>
          ) : null}
          <div className="Banner__body">
            <div
              className="movie__img"
              style={{
                backgroundSize: "cover",
                backgroundImage: `${
                  movie?.backdrop_path
                    ? `url("${imgUrl}${movie?.poster_path}")`
                    : `url("https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png")`
                }`,
                backgroundPosition: "center center",
              }}
            ></div>
            <div className="movie__info">
              <h2>{movie?.title}</h2>
              <h3>Overview</h3>
              <p>{truncate(movie?.overview, 150)}</p>
              <br />
              <br />
              <h4>Genres:</h4>
              <h3>{checkGenres(movie?.genre_ids)}</h3>
              <div className="additional__info">
                <div>
                  Original Release: <br /> <h3>{movie?.release_date}</h3>
                </div>
                <div>
                  Popularity: <br /> <h3>{movie?.popularity}</h3>
                </div>
                <div>
                  Vote Count: <br /> <h3>{movie?.vote_count}</h3>
                </div>
                <div>
                  Vote Average: <br /> <h3>{movie?.vote_average}/10</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
