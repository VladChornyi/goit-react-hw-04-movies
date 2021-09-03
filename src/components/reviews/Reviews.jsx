import { getMovieReviewsApi } from '../../utils/servicesAPI';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Reviews.module.css';

const Reviews = ({ movieId }) => {
  const [reviews, setReview] = useState(null);

  useEffect(() => {
    getMovieReviewsApi(movieId).then(reviews => setReview(reviews));
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [movieId]);

  return (
    <>
      <ul>
        {reviews && reviews.results && reviews.results.length ? (
          reviews.results.map(review => (
            <li key={review.id}>
              <h3 className={s.title}>{review.author}</h3>
              <p className={s.text}>{review.content}</p>
            </li>
          ))
        ) : (
          <h2 className={s.title}>no reviews</h2>
        )}
      </ul>
    </>
  );
};

export default Reviews;

Reviews.propTypes = {
  movieId: PropTypes.string,
};
