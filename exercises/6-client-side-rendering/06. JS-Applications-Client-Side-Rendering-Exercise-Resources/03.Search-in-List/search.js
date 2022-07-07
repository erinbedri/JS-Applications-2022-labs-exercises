import { render, html } from '../../../../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

let body = document.body;

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

let templateSearch = (data, searched) => html`
      <article>
         <div id="towns">
            <ul>${
               data.map(city => html`<li class=${city.toLowerCase().includes(searched) ? 'active' : ''}>${city}</li>`)
            }</ul>
         </div>
         <input type="text" id="searchText" />
         <button @click="${search}">Search</button>
         <div id="result">${data.filter(city => city.toLowerCase().includes(searched)).length} matches found</div>
      </article>
`

function search() {
   let searchElement = document.getElementById('searchText');
   let searchValue = document.getElementById('searchText').value;
   
   render(templateSearch(towns, searchValue.toLowerCase()), body);

   searchElement.value = '';
}
