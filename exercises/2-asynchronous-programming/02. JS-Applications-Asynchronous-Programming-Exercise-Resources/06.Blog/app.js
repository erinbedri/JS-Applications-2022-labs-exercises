function attachEvents() {
    const loadBtn = document.getElementById('btnLoadPosts');
    const viewBtn = document.getElementById('btnViewPost');
    let posts = document.getElementById('posts');
    let comments = document.getElementById('post-comments');

    loadBtn.addEventListener('click', () => {
        let url = 'http://localhost:3030/jsonstore/blog/posts';
        let dropdownElement = document.getElementById('posts');

        fetch(url)
            .then(res => res.json())
            .then(data => {
                Object.values(data).forEach(el => {
                    let option = document.createElement('option');
                    option.value = el.id;
                    option.textContent = el.title.toUpperCase();
                    dropdownElement.appendChild(option);
                })
            })
    })

    viewBtn.addEventListener('click', (e) => {
        let postId = posts.options[posts.selectedIndex].value;
        let url = `http://localhost:3030/jsonstore/blog/posts/${postId}`

        let postTitleElement = document.getElementById('post-title');
        postTitleElement.textContent = posts.options[posts.selectedIndex].text;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let postBodyElement = document.getElementById('post-body');
                postBodyElement.textContent = data.body;
            })

        let commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
        comments.innerHTML = '';

        fetch(commentsUrl)
            .then(res => res.json())
            .then(data => {
                Object.values(data).forEach(comment => {
                    if (comment.postId === postId) {
                        let li = document.createElement('li');
                        li.textContent = comment.text;
                        comments.appendChild(li);
                    }
                })
            })
    })
}

attachEvents();