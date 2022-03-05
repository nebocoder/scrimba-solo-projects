const search = document.querySelector('.search--section__input');
const searchButton = document.querySelector('.search--section__button');
const main = document.querySelector('.main--section');

async function getMovieIds() {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${config.key}&s=${search.value}`
  );
  const data = await response.json();

  search.value = '';

  return data.Search.map((movie) => {
    return movie.imdbID;
  });
}

async function getMovieInfo(movieId) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${config.key}&i=${movieId}`
  );
  const data = await response.json();

  return getMovieHtml(data);
}

function getMovieHtml(data) {
  return `
    <div class="movie--card">
      <img
        class="movie--poster"
        src="${data.Poster}"
      />
      <div class="movie--info">
        <div class="movie--title">
          <h3>${data.Title}</h3>
          <img src="images/star.png" />
          <p>${data.imdbRating}</p>
        </div>
        <div class="movie--extra">
          <p class="movie--length">${data.Runtime}</p>
          <p class="movie--genre">${data.Genre}</p>
          <a href="#" class="watchlist">
            <img class="plus--icon" src="images/plus.png" />
            <p class="watchlist--action">Watchlist</p>
          </a>
        </div>
        <p class="movie--summary">${data.Plot}</p>
      </div>
    </div>
  `;
}

async function renderMoviesHtml() {
  const movieIdArray = await getMovieIds();
  const totalHtml = [];

  if (movieIdArray.length) {
    main.innerHTML = `
    <h3 class="main--section__title">Loading...</h3>
    `;
    main.style.justifyContent = `flex-start`;
    main.style.paddingTop = '63px';

    for (let i = 0; i < movieIdArray.length; i++) {
      totalHtml.push(await getMovieInfo(movieIdArray[i]));
    }

    main.innerHTML = totalHtml.join('');
  }
}

searchButton.addEventListener('click', renderMoviesHtml);
