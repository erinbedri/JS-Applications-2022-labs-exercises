import { showView } from "./util.js";

const section = document.querySelector('#home-page');
let moviesList = section.querySelector('.card-deck.d-flex.justify-content-center')

export function homePage() {
    showView(section);
}

loadMovies();

function loadMovies() {
    fetch('http://localhost:3030/data/movies')
        .then(res => {
            if (res.status != 200) {
                throw new Error('Data cannot be fetch from Server')
            }
            return res.json()
        })
        .then(movies => {
            movies.forEach(movie => {
                let currentMovie = createHtmlElement(movie);
                moviesList.appendChild(currentMovie);
            });
        })
        .catch(error => alert(error.message));
}

function createHtmlElement(movie) {
    let element = document.createElement('div');
    element.className = 'card mb-4';

    element.innerHTML = `
            <img class="card-img-top" src="${movie.img}"
                alt="Card image cap" width="400">
            <div class="card-body">
                <h4 class="card-title">${movie.title}</h4>
            </div>
            <div class="card-footer">
                <a href="/details/${movie._id}">
                    <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
                </a>
            </div>`;

    return element;
}
