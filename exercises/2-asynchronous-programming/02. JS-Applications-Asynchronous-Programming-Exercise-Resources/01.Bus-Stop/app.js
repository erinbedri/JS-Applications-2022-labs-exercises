async function getInfo() {

    const checkBtn = document.getElementById('submit');

    let stopId = document.getElementById('stopId').value;
    let stopNameElement = document.getElementById('stopName');
    let list = document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    if (stopId == '') {
        return;
    }

    try {
        checkBtn.disabled = true;

        stopNameElement.textContent = 'Loading...';
        list.replaceChildren();

        const res = await fetch(url);

        if (res.status != 200) {
            throw new Error('Incorrect StopID')
        }

        const data = await res.json();
        stopNameElement.textContent = data.name;

        let busses = data.buses;

        for (const [id, minutes] of Object.entries(busses)) {
            let li = document.createElement('li');
            li.textContent = `Bus ${id} arrives in ${minutes} minutes`;
            list.appendChild(li);
        }

        checkBtn.disabled = false;

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }
}