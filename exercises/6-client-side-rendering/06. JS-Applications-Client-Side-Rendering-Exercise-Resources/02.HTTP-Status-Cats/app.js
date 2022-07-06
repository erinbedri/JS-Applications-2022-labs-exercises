import { render, html } from '../../../../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

let allCatsSection = document.getElementById('allCats');

let catTemplate = (data) => html`
        <ul>${data.map(data => html`
            <li data-id="${data.id}">
                ${html`
                <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="${data.id}">
                        <h4>Status Code: ${data.statusCode}</h4>
                        <p>${data.statusMessage}</p>
                    </div>
                </div>`}
            </li>`)
        }</ul>
`

render(catTemplate(cats), allCatsSection);

allCatsSection.addEventListener('click', onClick);

function onClick(e) {
    e.preventDefault();

    if (e.target.tagName == 'BUTTON') {
        let button = e.target;
        let divElement = e.target.nextElementSibling;

        if (button.textContent == 'Show status code') {
            button.textContent = 'Hide status code';
            divElement.style.display = 'block';
        }
        else if (button.textContent == 'Hide status code') {
            button.textContent = 'Show status code';
            divElement.style.display = 'none';
        }
    }
}