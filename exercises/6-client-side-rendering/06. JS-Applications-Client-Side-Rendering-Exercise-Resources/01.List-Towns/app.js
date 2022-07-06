import { render, html } from '../../../../node_modules/lit-html/lit-html.js';

const loadBtn = document.getElementById('btnLoadTowns');
loadBtn.addEventListener('click', onClick);

const template = (data) => html`
        <ul>${
            data.map(city => html`<li>${city}</li>`)
        }</ul>
`

function onClick(e) {
    let root = document.getElementById('root');
    let inputField = document.getElementById('towns');

    if (inputField.value != '') {
        e.preventDefault()

        render(template(inputField.value.split(', ')), root)

        inputField.value = '';
    }
}