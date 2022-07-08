import { html, render } from '../../../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getTowns() {
    const response = await fetch(url);
    return await response.json();
};

let template = (data) => html`
            <select id="menu">
                ${data.map(city => html`<option value=${city._id}>${city.text}</option>`)}
            </select>
`

let menu = document.querySelector('div');
let towns = Object.values(await getTowns());

function update(towns) {
    let result = template(towns);
    render(result, menu);
};

update(towns);

document.querySelector('form').addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();

    let text = document.getElementById('itemText').value;

    if (text != '') {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text })
        })

        towns.push(await response.json());
        update(towns);

        document.getElementById('itemText').value = '';
    }
};