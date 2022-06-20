function solution() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            let main = document.getElementById('main');
            main.innerHTML = '';

            Object.values(data).forEach(el => {
                let id = el._id;
                let currentAccordion = createAccordion(el, id);
                main.appendChild(currentAccordion);
            })
        })

    function createAccordion(element, id) {
        let title = element.title;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`

        let div = document.createElement('div');
        div.classList.add('accordion');

        fetch(url)
            .then(res => res.json())
            .then(info => {

                let divHead = document.createElement('div');
                divHead.classList.add('head');

                let span = document.createElement('span');
                span.textContent = `${title}`;
                divHead.appendChild(span);

                let button = document.createElement('button');
                button.classList.add('button');
                button.id = `${id}`;
                button.textContent = 'More';
                button.addEventListener('click', buttonEventHandler);
                divHead.appendChild(button);

                div.appendChild(divHead);

                let divExtra = document.createElement('div');
                divExtra.classList.add('extra');

                let p = document.createElement('p');
                p.textContent = `${info.content}`;
                divExtra.appendChild(p);

                div.appendChild(divExtra)
            })
        return div;
    }

    function buttonEventHandler(e) {
        let btn = e.target;
        let hiddenDiv = btn.parentElement.nextElementSibling;

        btn.textContent = btn.textContent === 'More'
            ? 'Less'
            : 'More';

        hiddenDiv.style.display = hiddenDiv.style.display === 'block'
            ? 'none'
            : 'block';
    }
}


solution()