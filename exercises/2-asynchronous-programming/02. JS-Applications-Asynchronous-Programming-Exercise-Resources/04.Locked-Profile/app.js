function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let main = document.getElementById('main');
            main.innerHTML = '';

            Object.values(data).forEach((profile, index) => {
                let currentProfile = createProfile(profile, index)
                main.appendChild(currentProfile);
            });
        })

    function createProfile(profile, index) {
        let div = document.createElement('div');
        div.classList.add('profile');

        let image = document.createElement('img');
        image.src = './iconProfile2.png';
        image.classList.add('userIcon');
        div.appendChild(image);

        let lockLabel = document.createElement('label');
        lockLabel.textContent = 'Lock';
        div.appendChild(lockLabel);

        let lockInputElement = document.createElement('input');
        lockInputElement.type = 'radio';
        lockInputElement.name = `user${index + 1}Locked`;
        lockInputElement.value = 'lock';
        lockInputElement.checked = true;
        div.appendChild(lockInputElement);

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = 'Unlock';
        div.appendChild(unlockLabel);

        let unlockInputElement = document.createElement('input');
        unlockInputElement.type = 'radio';
        unlockInputElement.name = `user${index + 1}Locked`;
        unlockInputElement.value = 'unlock';
        unlockInputElement.checked = false;
        div.appendChild(unlockInputElement);

        let br = document.createElement('br');
        let hr1 = document.createElement('hr');
        div.appendChild(br);
        div.appendChild(hr1);

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username';
        div.appendChild(usernameLabel);

        let usernameInputElement = document.createElement('input');
        usernameInputElement.type = 'text';
        usernameInputElement.name = `user${index + 1}Username`;
        usernameInputElement.value = `${profile.username}`;
        usernameInputElement.disabled = true;
        usernameInputElement.readOnly = true;
        div.appendChild(usernameInputElement);

        let divHidden = document.createElement('div');
        divHidden.id = `user${index + 1}HiddenFileds`;
        divHidden.style.display = 'none';

        let hr2 = document.createElement('hr');
        divHidden.appendChild(hr2);

        let emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';
        divHidden.appendChild(emailLabel);

        let emailInputElement = document.createElement('input');
        emailInputElement.type = 'email';
        emailInputElement.name = `user${index + 1}Email`;
        emailInputElement.value = `${profile.email}`;
        emailInputElement.disabled = true;
        emailInputElement.readOnly = true;
        divHidden.appendChild(emailInputElement);

        let ageLabel = document.createElement('label');
        ageLabel.textContent = 'Age:';
        divHidden.appendChild(ageLabel);

        let ageInputElement = document.createElement('input');
        ageInputElement.type = 'age';
        ageInputElement.name = `user${index + 1}Age`;
        ageInputElement.value = `${profile.age}`;
        ageInputElement.disabled = true;
        ageInputElement.readOnly = true;
        divHidden.appendChild(ageInputElement);

        div.appendChild(divHidden);

        let showBtn = document.createElement('button');
        showBtn.textContent = 'Show more';
        showBtn.addEventListener('click', showBtnEventHandler);
        div.appendChild(showBtn);

        return div;
    }

    function showBtnEventHandler(e) {
        let profile = e.target.parentElement;
        let showMoreBtn = e.target;
        let hiddenFieldsDiv = e.target.previousElementSibling;
        let radioBtn = profile.querySelector('input[type="radio"]:checked');

        if (radioBtn.value !== 'unlock') {
            return;
        }

        showMoreBtn.textContent = showMoreBtn.textContent === 'Show more'
            ? 'Hide it'
            : 'Show more';

        hiddenFieldsDiv.style.display = hiddenFieldsDiv.style.display === 'block'
            ? 'none'
            : 'block';
    }
}