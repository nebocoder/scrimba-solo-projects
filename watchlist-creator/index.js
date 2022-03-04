const search = document.querySelector('.search--section__input');
const searchButton = document.querySelector('.search--section__button');
const main = document.querySelector('.main--section');

async function getMovieIds() {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${config.key}&s=${search.value}`
  );
  const data = await response.json();

  return data.Search.map((movie) => {
    return movie.imdbID;
  });
}

function getMovieInfo(movieId) {
  fetch(`http://www.omdbapi.com/?apikey=${config.key}&i=${movieId}`)
    .then((response) => response.json())
    .then((data) => data);
}
