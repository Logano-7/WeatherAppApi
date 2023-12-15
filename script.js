const myKey = '6b0879c46b52b55d069eeff8a6bc1a22';

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputCity = document.querySelector('input').value;
    const getCoordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${myKey}`;

    fetch(getCoordURL)
        .then(response => response.json())
        .then((res) => {
            const lat = res[0].lat;
            const lon = res[0].lon;
            const getWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;

            fetch(getWeatherURL)
                .then(response => response.json())
                .then((res) => {
                    console.log(res);
                    const cityName = res.name;
                    const temp = Math.ceil(res.main.temp);
                    const weather = res.weather[0].main;
                    const icon = res.weather[0].icon;
                    const humidity = res.main.humidity;
                    const wind = res.wind.speed;
                    const realFeel = res.main.feels_like;
                    console.log('logan');

                    document.querySelector('.city').innerHTML = 'Weather in ' + cityName;
                    document.querySelector('.temp').innerHTML = temp + '°F';
                    document.querySelector('.description').innerHTML = weather;
                    document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}.png`;
                    document.querySelector('.humidity').innerHTML = 'Humidity: ' + humidity + '%';
                    document.querySelector('.wind').innerHTML = 'Wind Speed: ' + wind + ' mph';
                    document.querySelector('.realFeel').innerHTML = 'Real Feel: ' + realFeel + '°F';

                    
                })
                .catch(err => console.log(err));


        })
        .catch(err => console.log(err));

        document.querySelector('input').value = '';
});