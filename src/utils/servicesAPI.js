const KEY = '56e8a9f881b2c7281d6a93cec630170a';
export const getMoviesApi = () => {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`)
    .then(res => res.json())
    .then(response => response.results);
};

export const getMovieDetailsApi = movieId => {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`).then(
    res => res.json(),
  );
};

export const getMovieCastApi = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
  ).then(res => res.json());
};

export const getMovieReviewsApi = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  ).then(res => res.json());
};

export const getMovieByQueryApi = query => {
  return fetch(
    `
https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  ).then(res => res.json());
};
