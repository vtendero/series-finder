'use strict';

const inputElement = document.querySelector('.js-input');
const searchButtonElement = document.querySelector('.js-searchButton');
const searchResults = document.querySelector('.js-searchResults');
const searchHiddenElement = document.querySelector('.js-results__search');
const formElement = document.querySelector('.js-form');
const favResults = document.querySelector('.js-favResults');
const favRemove = document.querySelector('.js-favRemoveButton');

let series = [];
let favoritesSeries = [];

//resultados de búsqueda
function handleSearchResults(event) {
  event.preventDefault();
  getSeries(getSeriesTitle());
}
searchButtonElement.addEventListener('click', handleSearchResults);
formElement.addEventListener('submit', handleSearchResults);


//petición API
function getSeries(title) {
  fetch(`https://api.tvmaze.com/search/shows?q=${title}`)
    .then(response => response.json())
    .then(data => {
      series = data;
      renderSeries();
    });
}

//local storage
function setInLocalStorage() {
  const stringFavoritesSeries = JSON.stringify(favoritesSeries);
  localStorage.setItem('favoritesSeries', stringFavoritesSeries);
}

const getFromLocalStorage = () => {
  const localStorageFavSeries = localStorage.getItem('favoritesSeries');
  if (localStorageFavSeries !== null) {
    const arrayFavSeries = JSON.parse(localStorageFavSeries);
    favoritesSeries = arrayFavSeries;
    renderFavorites();
  }
};

//función como argumento para utilizar en la función getSeries como parámetro cuando se ejecuta en handleSearchResults
function getSeriesTitle() {
  return inputElement.value;
}

//mostrar resultados de búsqueda
function renderSeries() {
  searchHiddenElement.classList.remove('js-searchHidden');
  let htmlCode = '';
  let highlightedClass = '';
  const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  for (const serie of series) {
    if (isFavorite(serie.show.id)) {
      highlightedClass = 'js-highlighted';
    } else {
      highlightedClass = '';
    }
    htmlCode += `<li class="results__search--item ">`;
    htmlCode += `<h3 class="results__search--title_movie">${serie.show.name}</h3>`;
    if (serie.show.image === null) {
      htmlCode += `<img class="results__search--image" src=${defaultImage} alt="Imagen no disponible">`;
    } else {
      htmlCode += `<img class="results__search--image" src="${serie.show.image.medium}" alt="Imagen serie ${serie.show.name}">`;
    }
    htmlCode += `<div class="results__search--fav js-selected_fav ${highlightedClass}" id="${serie.show.id}" title="Añadir a favoritos">❤︎</div>`;
    htmlCode += '</li>';
  }
  searchResults.innerHTML = htmlCode;
  listenClickSeries();
}

//favoritas
function handleFavoritesSeries(event) {
  addFavoritesSeries(event);
  renderFavorites();
  setInLocalStorage();
}

//serie en la que hago click para añadir a favoritas
function listenClickSeries() {
  const series = document.querySelectorAll('.js-selected_fav');
  for (const serie of series) {
    serie.addEventListener('click', handleFavoritesSeries);
  }
}

//añadir favoritos al array favoritesSeries
function addFavoritesSeries(event) {
  const getId = parseInt(event.currentTarget.id);
  const clickSerie = series.find((serie) => getId === serie.show.id);
  const favSerie = favoritesSeries.findIndex((serie) => getId === serie.show.id);
  if (favSerie === -1 ) {
    favoritesSeries.push(clickSerie);
  } else {
    favoritesSeries.splice(favSerie, 1);
  }
  renderSeries();
  renderFavorites();
}

function isFavorite(id) {
  return favoritesSeries.findIndex((serie) => id === serie.show.id) !== -1;
}

//mostrar resultados de favoritos
function renderFavorites() {
  let htmlCode = '';
  const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  for (const favorite of favoritesSeries) {
    htmlCode += `<li class="results__favorites--item">`;
    htmlCode += `<i class="far fa-times-circle results__favorites--delete js-selected_fav" id="${favorite.show.id}"></i>`;
    htmlCode += `<h3 class="results__favorites--title_movie">${favorite.show.name}</h3>`;
    if (favorite.show.image === null) {
      htmlCode += `<img class="results__favorites--image" src=${defaultImage}alt="Imagen no disponible">`;
    } else {
      htmlCode += `<img class="results__favorites--image" src="${favorite.show.image.medium}" alt="Imagen serie ${favorite.show.name}">`;
    }
    htmlCode += '</li>';
  }
  favResults.innerHTML = htmlCode;
  listenClickSeries();
}

//borrar favoritos
function handleRemoveFavorites(){
  favoritesSeries = [];
  localStorage.removeItem('favoritesSeries');
  renderSeries();
  renderFavorites();
}
favRemove.addEventListener('click', handleRemoveFavorites);

getFromLocalStorage();