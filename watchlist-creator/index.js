const search = document.querySelector('.search--section__input');
const searchButton = document.querySelector('.search--section__button');
const main = document.querySelector('.main--section');

async function getMovieIds() {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${config.key}&s=${search.value}`
  );
  const data = await response.json();

  search.value = '';

  if (data.Response === 'True') {
    return data.Search.map((movie) => {
      return movie.imdbID;
    });
  } else {
    main.innerHTML = `
    <h3 class="main--section__title">
      Unable to find what you’re looking for. Please try another search.
    </h3>
    `;
  }
}

async function getMovieInfo(movieId) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${config.key}&i=${movieId}`
  );
  const data = await response.json();

  return getMovieHtml(data);
}

function getMovieHtml(data) {
  let plotTruncated = '';
  let posterSource = '';
  let titleTruncated = '';

  if (data.Poster !== 'N/A') {
    posterSource = data.Poster;
  } else {
    posterSource = 'images/poster.png';
  }

  if (data.Title.length > 23) {
    titleTruncated = `${data.Title.substr(0, 23)}...`;
  } else {
    titleTruncated = data.Title;
  }

  if (data.Plot === 'N/A') {
    plotTruncated = 'No movie summary available.';
  } else if (data.Plot.length > 125) {
    plotTruncated = `
      ${data.Plot.substr(0, 125)}
      <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank">
        Read more
      </a>`;
  } else {
    plotTruncated = data.Plot;
  }

  const genreTruncated = `
    ${data.Genre.split(', ').slice(0, 3).join(', ')}
  `;

  return `
    <div class="movie--card">
      <img
        class="movie--poster"
        src="${posterSource}"
      />
      <div class="movie--info">
        <div class="movie--title">
          <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank">
            <h3>${titleTruncated} (${data.Year})</h3>
          </a>
          <img src="images/star.png" />
          <p>${data.imdbRating}</p>
        </div>
        <div class="movie--extra">
          <p class="movie--length">${data.Runtime}</p>
          <p class="movie--genre">${genreTruncated}</p>
          <a href="#" class="watchlist">
            <img class="plus--icon" src="images/plus.png" />
            <p class="watchlist--action">Watchlist</p>
          </a>
        </div>
        <p class="movie--summary">${plotTruncated}</p>
      </div>
    </div>
  `;
}

async function renderMoviesHtml() {
  const movieIdArray = await getMovieIds();
  const totalHtml = [];

  movieIdArray.length;
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

searchButton.addEventListener('click', renderMoviesHtml);
search.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});
