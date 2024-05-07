const MovieReviewsItem = ({ review }) => {
  return (
    <div>
      {review.map((item) => {
        return (
          <li key={item.id}>
            <h2> {item.author}</h2>
            <p>{item.content}</p>
          </li>
        );
      })}
    </div>
  );
};

export default MovieReviewsItem;
