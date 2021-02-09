'use strict';

const inputElement = document.querySelector('.js-input');
const searchButtonElement = document.querySelector('.js-searchButton');
const searchResults = document.querySelector('.js-searchResults');
const formElement = document.querySelector('.js-form');

function handleSearch(event) {
  event.preventDefault();
  getSeries(getSeriesTitle());
}

searchButtonElement.addEventListener('click', handleSearch);
formElement.addEventListener('submit', handleSearch);

//petición API
function getSeries(title) {
  fetch(`http://api.tvmaze.com/search/shows?q=${title}`)
    .then(response => response.json())
    .then(series => {
      renderSeries(series);
    });
}
//función como argumento para utilizar en la función getSeries como parámetro
function getSeriesTitle() {
  return inputElement.value;
}

//mostrar resultados de búsqueda
function renderSeries(series) {
  let htmlCode = '';
  for (const serie of series) {
    htmlCode += `<li class="results__search--item" id="${serie.show.id}">`;
    htmlCode += `<h3 class="results__search--subtitle">${serie.show.name}</h3>`;
    if (serie.show.image === null) {
      htmlCode += `<img class="results__search--image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="Imagen no disponible">`;
    } else {
      htmlCode += `<img class="results__search--image" src="${serie.show.image.medium}" alt="Imagen serie ${serie.show.name}">`;
    }
    htmlCode += '</li>';
  }
  searchResults.innerHTML = htmlCode;
}