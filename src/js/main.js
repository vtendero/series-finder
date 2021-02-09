'use strict';

const inputElement = document.querySelector('.js-input');
const searchButtonElement = document.querySelector('.js-searchButton');
const searchResults = document.querySelector('.js-searchResults');
const formElement = document.querySelector('.js-form');
const favResults = document.querySelector('.js-favResults');


//resultados de búsqueda
function handleSearchResults(event) {
  event.preventDefault();
  getSeries(getSeriesTitle());
}
searchButtonElement.addEventListener('click', handleSearchResults);
formElement.addEventListener('submit', handleSearchResults);

//petición API
function getSeries(title) {
  fetch(`http://api.tvmaze.com/search/shows?q=${title}`)
    .then(response => response.json())
    .then(series => {
      renderSeries(series);
    });
}
//función como argumento para utilizar en la función getSeries como parámetro cuando se ejecuta en handleSearchResults
function getSeriesTitle() {
  return inputElement.value;
}

//mostrar resultados de búsqueda
function renderSeries(series) {
  let htmlCode = '';
  for (const serie of series) {
    htmlCode += `<li class="results__search--item js-search_item" id="${serie.show.id}">`;
    htmlCode += `<h3 class="results__search--title_movie">${serie.show.name}</h3>`;
    if (serie.show.image === null) {
      htmlCode += `<img class="results__search--image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="Imagen no disponible">`;
    } else {
      htmlCode += `<img class="results__search--image" src="${serie.show.image.medium}" alt="Imagen serie ${serie.show.name}">`;
    }
    htmlCode += '</li>';
  }
  searchResults.innerHTML = htmlCode;
  listenClickSeries();
}

//favoritas
function handleFavoritesSeries (event) {
  addFavoritesSeries(event);
  // renderFavorites();
}

//serie en la que hago click para añadir a favoritas
function listenClickSeries() {
  const series = document.querySelectorAll('.js-search_item');
  for (const serie of series) {
    serie.addEventListener('click', handleFavoritesSeries);
  }
}
//array para guardar las series favoritas
let favoritesSeries = [];

//añadir favoritos al array favoritesSeries
function addFavoritesSeries (event) {
  const clickSerie = parseInt(event.currentTarget.id);
  const favSerie = favoritesSeries.findIndex((serieId) => serieId.show.id === clickSerie);
}

//mostrar resultados de favoritos
function renderFavorites(favorites) {
  let htmlCode = '';
  for (const favorite of favorites) {
    htmlCode += `<li class="results__favorites--item" id="${favorite.show.id}">`;
    htmlCode += `<h3 class="results__favorites--title_movie">${favorite.show.name}</h3>`;
    htmlCode += '<i class="far fa-times-circle js-movieRemove"></i>';
    if (favorite.show.image === null) {
      htmlCode += `<img class="results__favorites--image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="Imagen no disponible">`;
    } else {
      htmlCode += `<img class="results__favorites--image" src="${favorite.show.image.medium}" alt="Imagen serie ${favorite.show.name}">`;
    }
    htmlCode += '</li>';
  }
  favResults.innerHTML = htmlCode;
}