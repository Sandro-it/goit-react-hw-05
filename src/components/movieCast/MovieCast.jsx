import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/api.js";
import MovieCastItem from "../movieCastItem/MovieCastItem.jsx";
import Loader from "../loader/Loader.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const loadMovieById = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovieCast(movieId);
        const cast = movies.data.cast;
        setMovieCast(cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadMovieById();
  }, [movieId]);

  return (
    <>
      <ul className={css.castList}>
        {movieCast.map((cast) => {
          return (
            <li key={cast.id}>
              <MovieCastItem {...cast} key={cast.id} />
            </li>
          );
        })}
      </ul>
      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
};
export default MovieCast;
