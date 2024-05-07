import css from "./MovieList.module.css";
import { NavLink, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li className={css.movieListItem} key={movie.id}>
          <NavLink to={`/movies/${movie.id}`} state={location}>
            <div className={css.movieItemContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="Movie Poster"
                className={css.moviePoster}
              />
              <h3 className={css.movieTitle}>{movie.title}</h3>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
