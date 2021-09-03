import { getMoviesApi } from '../../utils/servicesAPI';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './HomePage.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getMoviesApi().then(movies => setMovies([...movies]));
  }, []);

  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <ul className={s.list}>
        {movies.length &&
          movies.map(movie => (
            <li className={s.item} key={movie.id}>
              <Link
                className={s.link}
                to={{ pathname: `/movies/${movie.id}`, state: { from: location } }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Home;
