function attachEvents() {
    const loadButton = document.getElementById('btnLoad');
    const createButton = document.getElementById('btnCreate');

    let phonebook = document.getElementById('phonebook');

    let baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    loadButton.addEventListener('click', loadPhonebook);
    createButton.addEventListener('click', createPhoneContact);
    phonebook.addEventListener('click', deletePhoneContact);

    function loadPhonebook() {
        phonebook.textContent = '';

        fetch(baseUrl)
            .then(res => res.json())
            .then(numbers => {
                Object.values(numbers).forEach(number => {
                    let li = document.createElement('li');
                    li.dataset.id = number._id;
                    li.textContent = `${number.person}: ${number.phone}`;
                    phonebook.appendChild(li);

                    let deleteButon = document.createElement('button');
                    deleteButon.textContent = 'Delete';
                    deleteButon.classList.add('deleteBtn');
                    li.appendChild(deleteButon)
                })
            })
    };

    function createPhoneContact() {
        let personElement = document.getElementById('person');
        let phoneElement = document.getElementById('phone');

        let newContact = {
            "person": personElement.value,
            "phone": phoneElement.value
        }

        fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact)
        })

        personElement.value = '';
        phoneElement.value = '';

        loadPhonebook();
    };

    function deletePhoneContact (event) {
        let target = event.target;
        let phoneId = target.parentElement.getAttribute('data-id');

        if (target.className != 'deleteBtn') return;

        fetch(`${baseUrl}/${phoneId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(phoneId)
        })
            .then(res => res.json())

        target.parentElement.remove();
    };
}

attachEvents();