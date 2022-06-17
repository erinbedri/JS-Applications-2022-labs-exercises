async function loadRepos() {

	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	let list = document.getElementById('repos');
	list.innerHTML = '';

	try {
		const res = await fetch(url);

		if (res.status != 200) {
			throw new Error('Incorrect username')
		}

		const data = await res.json();

		data.forEach(repo => {
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.href = repo.html_url;
			a.textContent = repo.full_name;
			li.appendChild(a);
			list.appendChild(li);
		});

	} catch (error) {
		list.textContent = error;
	}
}
