'use strict';

const inputElement = document.querySelector('.js-input');
const searchButtonElement = document.querySelector('.js-searchButton');
const searchResults = document.querySelector('.js-searchResults');
const searchHiddenElement = document.querySelector('.js-results__search');
const formElement = document.querySelector('.js-form');
const favResults = document.querySelector('.js-favResults');
<<<<<<< HEAD
=======
const favRemove = document.querySelector('.js-favRemoveButton');
>>>>>>> remove-fav

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
  fetch(`http://api.tvmaze.com/search/shows?q=${title}`)
    .then(response => response.json())
    .then(data => {
      series = data;
      renderSeries();
      setInLocalStorage();
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
  for (const serie of series) {
    if (isFavorite(serie.show.id)) {
      highlightedClass = 'js-highlighted';
    } else {
      highlightedClass = '';
    }
    htmlCode += `<li class="results__search--item js-search_item ${highlightedClass}" id="${serie.show.id}">`;
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
function handleFavoritesSeries(event) {
  addFavoritesSeries(event);
  renderFavorites();
}

//serie en la que hago click para añadir a favoritas
function listenClickSeries() {
  const series = document.querySelectorAll('.js-search_item');
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
  toggleHighlight(event.currentTarget);
  setInLocalStorage();
}

//marcar cuando es seleccionada en resultados de búsqueda
function toggleHighlight(element) {
  element.classList.toggle('js-highlighted');
}

function isFavorite(id) {
  return favoritesSeries.findIndex((serie) => id === serie.show.id) !== -1;
}

//mostrar resultados de favoritos
function renderFavorites() {
  let htmlCode = '';
  for (const favorite of favoritesSeries) {
    htmlCode += `<li class="results__favorites--item" id="${favorite.show.id}">`;
    htmlCode += `<h3 class="results__favorites--title_movie">${favorite.show.name}</h3>`;
    htmlCode += '<i class="far fa-times-circle results__favorites--icon js-movieRemove"></i>';
    if (favorite.show.image === null) {
      htmlCode += `<img class="results__favorites--image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="Imagen no disponible">`;
    } else {
      htmlCode += `<img class="results__favorites--image" src="${favorite.show.image.medium}" alt="Imagen serie ${favorite.show.name}">`;
    }
    htmlCode += '</li>';
  }
  favResults.innerHTML = htmlCode;
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