import { html, render } from '../../../../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/table';

let rows = Object.values(await getInfo());
let tbody = document.querySelector('tbody');

initialization()

function initialization() {
	let initialTemplate = (data) => html`
		${data.map(row => html`
		<tr data-id=${row._id}>
			<td>${row.firstName} ${row.lastName}</td>
			<td>${row.email}</td>
			<td>${row.course}</td>
		</tr>`)}
	`
	
	function update() {
		let result = initialTemplate(rows);
		render(result, tbody);
	}

	update();
}

async function getInfo() {
	const response = await fetch(url);
	return await response.json();
}

document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick() {
	let searchField = document.getElementById('searchField');

	if (searchField.value != '') {
		const criteria = (element) => element.includes(searchField.value.toLowerCase());

		let searchTemplate = (data) => html`
			${data.map(row => html`
			<tr data-id=${row._id} class=${[row.firstName.toLowerCase(), row.lastName.toLowerCase(), row.email.toLowerCase(), row.course.toLowerCase()].some(criteria) ? 'select' : ''}>
				<td>${row.firstName} ${row.lastName}</td>
				<td>${row.email}</td>
				<td>${row.course}</td>
			</tr>`)}
		`

		let result = searchTemplate(rows);

		render(result, tbody);

		searchField.value = ''
	}
}