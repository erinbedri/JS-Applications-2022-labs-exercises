import {registerPage} from './register.js';
import {loginPage} from './login.js';
import {homePage} from './home.js';
import {createPage} from './create.js';
import {updateNav} from './util.js';

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logout,
    '/register': registerPage,
    '/create': createPage,
}

function onNavigate(event) {
    if (event.target.tagName == 'A' && event.target.href) {
        event.preventDefault();
        
        const url = new URL(event.target.href);
        const view = routes[url.pathname];

        if (typeof view == 'function') {
            console.log(event.target)
            view();
        }
    }
}

function logout() {
    console.log('logging out');
    updateNav();
}

updateNav();
homePage();