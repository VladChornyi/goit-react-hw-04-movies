import { useState, useEffect } from 'react';

import { Link, useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieByQueryApi } from '../../utils/servicesAPI';
import s from './MoviesPage.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (searchQuery) {
      getMovieByQueryApi(searchQuery).then(movies => setMovies(movies));
    }
  }, [searchQuery]);

  const handleSubmit = event => {
    if (query.trim() === '') {
      event.preventDefault();
      toast.error('Введите данные для запроса');
      return;
    }
    event.preventDefault();
    getMovieByQueryApi(query).then(movies => setMovies(movies));
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type={s.submit} className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}></span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
      <ul className={s.list}>
        {movies &&
          movies.results.map(movie => (
            <li className={s.item} key={movie.id}>
              <Link
                className={s.link}
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Movies;
