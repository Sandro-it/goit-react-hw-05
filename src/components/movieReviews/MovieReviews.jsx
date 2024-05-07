import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/api";
import MovieReviewsItem from "../movieReviewsItem/MovieReviewsItem";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    const loadMovieById = async () => {
      try {
        const movies = await fetchMovieReviews(movieId);
        const review = movies.data.results;
        setMovieReviews(review);
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
      {loading && <Loader />}
      {isError && <ErrorMessage />}

      {!loading && movieReviews !== null && movieReviews.length === 0 && (
        <p>Sorry, there is no reviews for this movie</p>
      )}
      {movieReviews && <MovieReviewsItem review={movieReviews} />}
    </>
  );
};
export default MovieReviews;
