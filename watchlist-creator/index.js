const search = document.querySelector('.search--section__input');
const searchButton = document.querySelector('.search--section__button');
const main = document.querySelector('.main--section');

let savedIds = JSON.parse(localStorage.getItem('savedIds')) || [];

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
    return [];
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
      ${data.Plot.substr(0, 125) + '...'}
      <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank">
        Read more
      </a>`;
  } else {
    plotTruncated = data.Plot;
  }

  const genreTruncated = `
    ${data.Genre.split(', ').slice(0, 3).join(', ')}
  `;

  const watchlistElement = savedIds.includes(data.imdbID)
    ? `<div id="${data.imdbID}">
        <div onclick="removeFromWatchlist('${data.imdbID}')" class="watchlist">
          <img class="watchlist--icon" src="images/minus.png" />
          <p class="watchlist--action">Remove</p>
        </div>
      </div>`
    : `<div id="${data.imdbID}" class="watchlist">
        <div onclick="addToWatchlist('${data.imdbID}')" class="watchlist">
          <img class="watchlist--icon" src="images/plus.png" />
          <p class="watchlist--action">Watchlist</p>
        </div>
      </div>`;

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
          <div class="movie--rating">
            <img src="images/star.png" />
            <p>${data.imdbRating}</p>
          </div>
        </div>
        <div class="movie--extra">
          <p class="movie--length">${data.Runtime}</p>
          <p class="movie--genre">${genreTruncated}</p>
          ${watchlistElement}
        </div>
        <p class="movie--summary">${plotTruncated}</p>
      </div>
    </div>
  `;
}

async function renderMoviesHtml() {
  const movieIdArray = await getMovieIds();
  const totalHtml = [];

  main.innerHTML = `
    <h3 class="main--section__title">Loading...</h3>
    `;

  for (let i = 0; i < movieIdArray.length; i++) {
    totalHtml.push(await getMovieInfo(movieIdArray[i]));
  }

  if (totalHtml.length) {
    main.style.justifyContent = `flex-start`;
    main.style.paddingTop = '63px';
    main.innerHTML = totalHtml.join('');
  } else {
    main.style.justifyContent = `center`;
    main.style.paddingTop = '0';
    main.innerHTML = `
    <h3 class="main--section__title">
      Unable to find what you’re looking for. Please try another search.
    </h3>
    `;
  }
}

function addToWatchlist(imdbID) {
  if (!savedIds.includes(imdbID)) {
    savedIds.push(imdbID);
    localStorage.setItem('savedIds', JSON.stringify(savedIds));
    document.getElementById(imdbID).innerHTML = `
      <div onclick="removeFromWatchlist('${imdbID}')" class="watchlist">
        <img class="watchlist--icon" src="images/minus.png" />
        <p class="watchlist--action">Remove</p>
      </div>
    `;
  }
}

function removeFromWatchlist(imdbID) {
  savedIds.splice(savedIds.indexOf(imdbID), 1);
  localStorage.setItem('savedIds', JSON.stringify(savedIds));
  document.getElementById(imdbID).innerHTML = `
    <div onclick="addToWatchlist('${imdbID}')" class="watchlist">
      <img class="watchlist--icon" src="images/plus.png" />
      <p class="watchlist--action">Watchlist</p>
    </div>
  `;
}

searchButton.addEventListener('click', renderMoviesHtml);
search.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});
