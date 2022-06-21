window.onload = clearTable;


let tableBody = document.getElementById('table-body');
let titleElement = document.querySelector('[name="title"]');
let authorElement = document.querySelector('[name="author"]');
let submith3 = document.getElementById('submit-h3');
let saveh3 = document.getElementById('save-h3');

let formSubmit = document.getElementById('submit');
let formSave = document.getElementById('save');
formSave.style.display = 'none';

const url = 'http://localhost:3030/jsonstore/collections/books';

const loadButton = document.getElementById('loadBooks');
loadButton.addEventListener('click', loadBooks);

const submitButton = document.getElementById('submitBtn');
submitButton.addEventListener('click', submitNewBook);

const saveButton = document.getElementById('saveBtn');
saveButton.addEventListener('click', editCurrentBook);

function clearTable() {
    tableBody.textContent = ''; tableBody.textContent = '';
};

function loadBooks() {
    tableBody.textContent = '';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                let tr = document.createElement('tr');
                tr.dataset.id = key;

                let titleTd = document.createElement('td');
                titleTd.className = 'book';
                titleTd.textContent = data[key].title;
                tr.appendChild(titleTd);

                let authorTd = document.createElement('td');
                authorTd.className = 'author';
                authorTd.textContent = data[key].author;
                tr.appendChild(authorTd);

                let buttonsTd = document.createElement('td');

                let editButton = document.createElement('button');
                editButton.id = 'editBtn';
                buttonsTd.appendChild(editButton);
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', editCurrentBook);

                let deleteButton = document.createElement('button');
                deleteButton.id = 'deleteBtn';
                buttonsTd.appendChild(deleteButton);
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', deleteCurrentBook);

                tr.appendChild(buttonsTd);

                tableBody.appendChild(tr);
            })
        })
};

function deleteCurrentBook(event) {
    let target = event.target;
    let bookId = target.parentElement.parentElement.getAttribute('data-id');

    if (target.id != 'deleteBtn') return;

    fetch(`${url}/${bookId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookId)
    })
        .then(res => res.json())

    target.parentElement.parentElement.remove();
};

function editCurrentBook(event) {
    let target = event.target;
    let parent = target.parentElement.parentElement;
    let bookId = target.parentElement.parentElement.getAttribute('data-id');

    formSubmit.style.display = 'none';
    formSave.style.display = 'block'

    if (target.id != 'editBtn') return;

    titleElement.value = parent.querySelector('.book').textContent;
    authorElement.value = parent.querySelector('.author').textContent;

    let updatedEntry = {
        "author": parent.querySelector('.author').textContent,
        "title": parent.querySelector('.book').textContent
    }


    fetch(`${url}/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEntry)
    })
        .then(res => res.json())

    h3.textContent = 'FORM';
    submitButton.textContent = 'Submit';
    loadBooks();
}


function submitNewBook(event) {
    event.preventDefault();

    if (titleElement.value != '' && authorElement.value != '') {

        let newBook = {
            "author": authorElement.value,
            "title": titleElement.value
        }

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())

        titleElement.value = '';
        authorElement.value = '';
        deleteCurrentBook();
        loadBooks();
    }
}