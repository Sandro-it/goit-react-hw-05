import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/api";
import MovieList from "../components/movieList/MovieList";
import Loader from "../components/loader/Loader";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadTrendMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchTrendingMovies();
        setTrendMovies(movies.data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadTrendMovies();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {isError && <ErrorMessage message="Failed to fetch trending movies" />}
      {!loading && !isError && <MovieList movies={trendMovies} />}
    </div>
  );
};

export default HomePage;
