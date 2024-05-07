import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../api/api";
import MovieList from "../components/movieList/MovieList";
import Loader from "../components/loader/Loader";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import css from "./css/MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadSearchMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchSearchMovie(searchParams.get("value") || "");
        setSearchMovies(movies.data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadSearchMovies();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.name.value.trim();
    setSearchParams({ value: searchValue });
    form.reset();
  };

  return (
    <div className={css.MoviesPageContainer}>
      <form className={css.MoviesPageForm} onSubmit={handleSubmit}>
        <input
          className={css.MoviesPageInput}
          type="text"
          name="name"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.searchBarButton} type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      {isError && <ErrorMessage message="Failed to fetch search results" />}
      {!loading && !isError && <MovieList movies={searchMovies} />}
    </div>
  );
};

export default MoviesPage;
