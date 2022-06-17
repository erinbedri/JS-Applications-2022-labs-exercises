function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let infoElement = document.getElementsByClassName('info')[0];

    let stop = { next: 'depot' };

    async function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        departBtn.disabled = true;
        arriveBtn.disabled = false;

        try {
            const res = await fetch(url);

            if (res.status != 200) {
                throw new Error()
            }

            stop = await res.json();

            infoElement.textContent = `Next stop ${stop.name}`

        } catch (error) {
            console.log('Error');
        }
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;

        infoElement.textContent = `Arriving at ${stop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();