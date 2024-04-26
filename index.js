function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    const apiKey = '0f197347b14174645f40e3e412333bad';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&appid=${apiKey}&units=metric`;


    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const body = document.body;
    if (data.cod === 200) {
        const { name, main, weather } = data;
        const weatherCondition = weather[0].main.toLowerCase();

        body.className = ''; // Reset the class
        if (weatherCondition.includes('clouds')) {
            body.classList.add('cloudy');
        } else if (weatherCondition.includes('rain')) {
            body.classList.add('rainy');
        } else if (weatherCondition.includes('clear')) {
            body.classList.add('sunny');
        }
        // Add more conditions here

        weatherDisplay.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Feels Like: ${main.feels_like}°C</p>
            <p>Weather: ${weather[0].main}</p>
        `;
    } else {
        body.className = ''; // Reset the class
        weatherDisplay.innerHTML = `<p>City not found. Please try another search.</p>`;
    }
}
