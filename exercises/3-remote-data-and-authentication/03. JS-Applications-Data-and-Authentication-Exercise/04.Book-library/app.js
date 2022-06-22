let submitForm = document.getElementById('submit-form');
let editForm = document.getElementById('edit-form');
let booksTableBody = document.getElementById('books-table-body');

const submitBtn = document.getElementById('submitBtn');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBooks');

let baseUrl = 'http://localhost:3030/jsonstore/collections/books';

editForm.style.display = 'none';
booksTableBody.textContent = '';

loadBtn.addEventListener('click', loadBooks);
submitBtn.addEventListener('click', loadBooks);
submitBtn.addEventListener('click', addNewBook);
booksTableBody.addEventListener('click', deleteBook);
booksTableBody.addEventListener('click', editBook);
booksTableBody.addEventListener('click', loadBooks);

function loadBooks(e) {
    //e.preventDefault();

    booksTableBody.textContent = '';

    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                let tr = document.createElement('tr');
                tr.dataset.id = key;

                let bookNameTd = document.createElement('td');
                bookNameTd.textContent = data[key].title;
                bookNameTd.classList.add('titleTd');
                tr.appendChild(bookNameTd);

                let authorNameTd = document.createElement('td');
                authorNameTd.textContent = data[key].author;
                authorNameTd.classList.add('authorTd');
                tr.appendChild(authorNameTd);

                let buttonsTd = document.createElement('td');

                let editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.textContent = 'Edit';
                buttonsTd.appendChild(editBtn);

                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('deleteBtn');
                deleteBtn.textContent = 'Delete';
                buttonsTd.appendChild(deleteBtn);

                tr.appendChild(buttonsTd);
                booksTableBody.appendChild(tr);
            })
        })
};

function addNewBook(e) {
    e.preventDefault();

    let titleInputElement = document.getElementById('submit-title-input');
    let authorInputElement = document.getElementById('submit-author-input');

    if (titleInputElement.value != '' && authorInputElement.value != '') {
        let newBookEntry = {
            "author": authorInputElement.value,
            "title": titleInputElement.value
        }

        fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBookEntry)
        })


        titleInputElement.value = '';
        authorInputElement.value = '';
    }
};

function deleteBook(e) {
    let target = e.target;
    let bookId = target.parentElement.parentElement.getAttribute('data-id');

    if (target.className != 'deleteBtn') return;

    fetch(`${baseUrl}/${bookId}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(bookId)
    })
        .then(res => res.json())

    target.parentElement.parentElement.remove();
};

function editBook(e) {
    e.preventDefault();

    submitForm.style.display = 'none';
    editForm.style.display = 'block';

    let target = e.target;
    let bookId = target.parentElement.parentElement.getAttribute('data-id');

    let authorInputElement = document.getElementById('edit-author-input');
    let titleInputElement = document.getElementById('edit-title-input');
    
    titleInputElement.value = document.querySelector(`tr[data-id="${bookId}"]`).querySelector('.titleTd').textContent;
    authorInputElement.value = document.querySelector(`tr[data-id="${bookId}"]`).querySelector('.authorTd').textContent;

    //if (target.className != 'saveBtn') return;
    
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        let editedBook = {
            "author": authorInputElement.value,
            "title": titleInputElement.value
        }

        fetch(`${baseUrl}/${bookId}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(editedBook)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        titleInputElement.value = '';
        authorInputElement.value = '';

        loadBooks()
        submitForm.style.display = 'block';
        editForm.style.display = 'none';

    })
};

// code neeeds to be refactored
// sometimes behaves unexpectedly when edit function is used