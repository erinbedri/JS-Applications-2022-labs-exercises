import { render, html } from '../../../../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

let body = document.body;
let number;

let initialState = (data) => html`
      <article>
         <div id="towns">
            <ul>${
               data.map(city => html`<li>${city}</li>`)
            }</ul>
         </div>
         <input type="text" id="searchText" />
         <button @click="${search}">Search</button>
         <div id="result"></div>
      </article>
`

render(initialState(towns), body);

let templateSearch = (data) => html`
      <article>
         <div id="towns">
            <ul>${
               data.map(city => html`<li>${city}</li>`)
            }</ul>
         </div>
         <input type="text" id="searchText" />
         <button @click="${search}">Search</button>
         <div id="result">${number} matches found</div>
      </article>
`

function search() {
   let searchElement = document.getElementById('searchText');
   let number = 5
   
   render(templateSearch(towns), body);

   searchElement.value = '';
}

/*
const townsList = document.getElementById('towns');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', search);

let template = (data) => html`
        <ul>${
            data.map(city => html`<li>${city}</li>`)
        }</ul>
`
render(template(towns), townsList);

function search() {
   let searchElement = document.getElementById('searchText');
   let matchesElement = document.getElementById('result');

   console.log(searchElement.value)

   searchElement.value = '';
}
*/
