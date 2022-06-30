import { homePage } from "./home.js";
import { showView, spinner } from "./util.js";

const section = document.querySelector('#add-movie');
const submitBtn = section.querySelector('#submitBtn');
const form = section.querySelector('.text-center.border.border-light.p-5')
form.addEventListener('submit', onSubmit);

export function createPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');

    if (title != '' && description != '' && img != '') {
        await addMovie(title, description, img);
        form.reset();
        homePage();
    }

}

async function addMovie(title, description, img) {
    let user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken,
        },
        body: JSON.stringify({ title, description, img })
    });

}
