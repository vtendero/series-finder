'use strict';

const inputElement = document.querySelector('.js-input');
const searchButtonElement = document.querySelector('.js-searchButton');


fetch(`http://api.tvmaze.com/search/shows?q=girls`)
    .then(response => response.json())
    .then(data => {
        for (const serie of data) {
        console.log(serie.show);
        console.log(serie.show.image);
        }
    })
