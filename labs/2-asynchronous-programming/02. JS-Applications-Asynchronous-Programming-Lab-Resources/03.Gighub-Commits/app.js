async function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let list = document.getElementById('commits');

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    list.innerHTML = '';

    try {
		const res = await fetch(url);

		if (res.status != 200) {
			throw new Error('Error occured')
		}

		const data = await res.json();

        console.log(data)

        data.forEach(repo => {
            let li = document.createElement('li');
            li.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
            list.appendChild(li);
        });


	} catch (error) {
		list.textContent = `Error: ${error.status} (Not Found)`;
	}
}