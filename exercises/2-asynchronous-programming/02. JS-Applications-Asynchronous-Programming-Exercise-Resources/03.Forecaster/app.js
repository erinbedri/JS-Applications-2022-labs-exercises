function attachEvents() {
    let forecastElement = document.getElementById('forecast');
    let currentForecastElement = document.getElementById('current');
    let threeDayForecastElement = document.getElementById('upcoming');

    const getBtn = document.getElementById('submit');

    getBtn.addEventListener('click', () => { getWeatherForecast() })

    function getWeatherForecast() {
        getBtn.disabled = true;

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => res.json())
            .then(locations => {
                let locationName = document.getElementById('location').value;
                let location = locations.find(location => location.name === locationName);
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
                    .then(res => res.json())
                    .then(currentWeatherForecast => ({ code: location.code, currentWeatherForecast }))
            })
            .then(({ code, currentWeatherForecast }) => {
                createCurrentWeatherForecast(currentWeatherForecast);
                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                    .then(res => res.json())
                    .then(futureWeatherForecast => {
                        let div = document.createElement('div');
                        div.classList.add('forecast-info');

                        for (const forecast of Object.entries(futureWeatherForecast.forecast)) {
                            let element = createFutureWeatherForecast(forecast[1]);
                            div.appendChild(element);
                            console.log(element)
                        }
                        threeDayForecastElement.appendChild(div)
                    })
            })
            getBtn.disabled = false;
    }

    function createCurrentWeatherForecast(weatherReport) {
        forecastElement.style.display = 'block';

        let div = document.createElement('div');
        div.classList.add('forecasts');

        let spanSymbol = document.createElement('span');
        spanSymbol.classList.add('codition-symbol');
        div.appendChild(spanSymbol);

        let spanCondition = document.createElement('span');

        if (weatherReport.forecast.condition === 'Sunny') {
            spanCondition.innerHTML = '\&#x2600;';
        } else if (weatherReport.forecast.condition === 'Partly sunny') {
            spanCondition.innerHTML = '&#x26C5;';
        } else if (weatherReport.forecast.condition === 'Overcast') {
            spanCondition.innerHTML = '&#x2601;';
        } else if (weatherReport.forecast.condition === 'Rain') {
            spanCondition.innerHTML = '&#x2614;';
        }

        spanCondition.classList.add('codition');

        let spanCity = document.createElement('span');
        spanCity.classList.add('forecast-data');
        spanCity.textContent = weatherReport.name;
        spanCondition.appendChild(spanCity);

        let spanTemp = document.createElement('span');
        spanTemp.classList.add('forecast-data');
        spanTemp.textContent = `${weatherReport.forecast.low}${`\u00B0`}/${weatherReport.forecast.high}${`\u00B0`}`;
        spanCondition.appendChild(spanTemp);

        let spanCond = document.createElement('span');
        spanCond.classList.add('forecast-data');
        spanCond.textContent = weatherReport.forecast.condition;
        spanCondition.appendChild(spanCond);

        div.appendChild(spanCondition);
        currentForecastElement.appendChild(div)
    }

    function createFutureWeatherForecast(weatherForecast) {

        let spanUpcoming = document.createElement('span');
        spanUpcoming.classList.add('upcoming');

        let spanCondition = document.createElement('span');

        if (weatherForecast.condition === 'Sunny') {
            spanCondition.innerHTML = '\&#x2600;';
        } else if (weatherForecast.condition === 'Partly sunny') {
            spanCondition.innerHTML = '&#x26C5;';
        } else if (weatherForecast.condition === 'Overcast') {
            spanCondition.innerHTML = '&#x2601;';
        } else if (weatherForecast.condition === 'Rain') {
            spanCondition.innerHTML = '&#x2614;';
        }

        spanCondition.classList.add('condition');

        let spanTemp = document.createElement('span');
        spanTemp.classList.add('forecast-data');
        spanTemp.textContent = `${weatherForecast.low}${`\u00B0`}/${weatherForecast.high}${`\u00B0`}`;
        spanCondition.appendChild(spanTemp);

        let spanCond = document.createElement('span');
        spanCond.classList.add('forecast-data');
        spanCond.textContent = weatherForecast.condition;

        spanUpcoming.appendChild(spanCondition);
        spanUpcoming.appendChild(spanTemp);
        spanUpcoming.appendChild(spanCond);

        return spanUpcoming;

    }
}

attachEvents();