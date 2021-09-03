import { getMovieCastApi } from '../../utils/servicesAPI';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Cast.module.css';

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMovieCastApi(movieId).then(cast => setCast(cast));
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [movieId]);
  return (
    <>
      <ul className={s.list}>
        {cast && cast.cast && cast.cast.length ? (
          cast.cast.map(actor => (
            <li className={s.card} key={actor.id}>
              <div className={s.wrapper}>
                <img
                  className={s.cast_img}
                  src={
                    actor.profile_path && 'https://image.tmdb.org/t/p/w500/' + actor.profile_path
                  }
                  alt={actor.name}
                />
              </div>
              <h3 className={s.text}>{actor.name}</h3>
            </li>
          ))
        ) : (
          <h2 className={s.text}>no cast</h2>
        )}
      </ul>
    </>
  );
};

export default Cast;

Cast.propTypes = {
  movieId: PropTypes.string,
};
