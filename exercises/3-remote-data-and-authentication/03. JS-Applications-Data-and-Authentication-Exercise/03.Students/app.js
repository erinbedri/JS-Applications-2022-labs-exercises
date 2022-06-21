window.onload = loadPhonebook;

const url = 'http://localhost:3030/jsonstore/collections/students';
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', submitNewEntry);

function submitNewEntry(e) {
    e.preventDefault();

    let firstNameElement = document.querySelector("[name=firstName]");
    let lastNameElement = document.querySelector("[name=lastName]");
    let facultyNumberElement = document.querySelector("[name=facultyNumber]");
    let gradeElement = document.querySelector("[name=grade]");

    if (firstNameElement.value != ''
        && lastNameElement.value != ''
        && facultyNumberElement.value != ''
        && gradeElement.value != '') {

        let newEntry = {
            firstName: firstNameElement.value,
            lastName: lastNameElement.value,
            facultyNumber: facultyNumberElement.value,
            grade: gradeElement.value
        };

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEntry)
        });

        firstNameElement.value = ''
        lastNameElement.value = ''
        facultyNumberElement.value = ''
        gradeElement.value = ''

        loadPhonebook();
    }
}

function loadPhonebook() {
    let tableBody = document.getElementById('results').querySelector('tbody');
    tableBody.textContent = '';

    fetch(url)
        .then(res => res.json())
        .then(students => {
            Object.values(students).forEach(student => {
                let tr = document.createElement('tr');

                let firtsNameTd = document.createElement('td');
                firtsNameTd.textContent = student.firstName;
                tr.appendChild(firtsNameTd);

                let lastNameTd = document.createElement('td');
                lastNameTd.textContent = student.lastName;
                tr.appendChild(lastNameTd);

                let facultyNumberTd = document.createElement('td');
                facultyNumberTd.textContent = student.facultyNumber;
                tr.appendChild(facultyNumberTd);

                let gradeTd = document.createElement('td');
                gradeTd.textContent = student.grade;
                tr.appendChild(gradeTd);

                tableBody.appendChild(tr);
            })
        });
};