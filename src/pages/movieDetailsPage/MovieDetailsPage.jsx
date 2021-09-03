import { getMovieDetailsApi } from '../../utils/servicesAPI';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { lazy, Suspense } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  NavLink,
  useRouteMatch,
  Route,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './MovieDetailsPage.module.css';

const Reviews = lazy(() =>
  import('../../components/reviews/Reviews' /* webpackChunkName: "Reviews"*/),
);
const Cast = lazy(() => import('../../components/cast/Cast' /* webpackChunkName: "Cast"*/));

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    getMovieDetailsApi(movieId).then(movie => setMovie(movie));
  }, [movieId]);

  const onHandleClick = () => {
    history.push(location.state?.from);
  };

  return (
    <>
      {movie && (
        <>
          <div className={s.wrapper}>
            <button type="button" className={s.button} onClick={onHandleClick}>
              Go back
            </button>
            <img
              className={s.img}
              src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
              alt={movie.title}
            />
            <div className={s.box}>
              <h2 className={s.title}>{movie.title}</h2>
              <p className={s.text}>User score: {movie.vote_average * 10}%</p>
              <h3 className={s.title}>Overview</h3>
              <p className={s.text}>{movie.overview}</p>
              <h3 className={s.title}>Genres</h3>
              {movie.genres &&
                movie.genres.map(genre => (
                  <p className={s.text} key={genre.id}>
                    {genre.name}
                  </p>
                ))}
              <ul className={s.list}>
                <li>
                  <NavLink
                    className={s.link}
                    to={{ pathname: `${url}/cast`, state: { from: location.state?.from } }}
                  >
                    cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={s.link}
                    to={{ pathname: `${url}/reviews`, state: { from: location.state?.from } }}
                  >
                    reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <Suspense
            fallback={
              <Loader
                type="BallTriangle"
                color="rgb(255, 127, 80)"
                height={80}
                width={80}
                timeout={3000}
              />
            }
          >
            <Route path={`${url}/cast`}>
              <Cast movieId={movieId} />
            </Route>
            <Route path={`${url}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
