import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navigation from './navigation/Navigation';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const HomePage = lazy(() => import('../pages/homePage/HomePage' /* webpackChunkName: "HomePage"*/));
const MoviesPage = lazy(() =>
  import('../pages/moviesPage/MoviesPage' /* webpackChunkName: "MoviesPage"*/),
);
const MovieDetailsPage = lazy(() =>
  import('../pages/movieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage"*/),
);

const App = () => {
  return (
    <>
      <Navigation />
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
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
