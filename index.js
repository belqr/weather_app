const selectors = {
  button: document.querySelector('div.search_box button'),
  weatherDetails: document.querySelector('div.weather_details'),
  weatherBox: document.querySelector('div.weather_box'),
  container: document.querySelector('div.container'),
  input: document.querySelector('div.search_box input'),
  temperature: document.querySelector('.weather_box .temperature'),
  description: document.querySelector('.weather_box .description'),
  humidity: document.querySelector('.weather_details .humidity span'),
  wind: document.querySelector('.weather_details .wind span'),
  image: document.querySelector('.weather_box img'),
  notFound: document.querySelector('div.not_found'),
}

const weatherAssets = {
  Clear: {
    icon: 'assets/sunny.png',
    background: 'assets/background/background-sunny.png',
  },
  Clouds: {
    icon: 'assets/clouds.png',
    background: 'assets/background/background-clouds.png',
  },
  Haze: {
    icon: 'assets/haze.png',
    background: 'assets/background/background-haze.png',
  },
  Rain: {
    icon: 'assets/rain.png',
    background: 'assets/background/background-rain.png',
  },
  Snow: {
    icon: 'assets/snow.png',
    background: 'assets/background/background-snow.png',
  },
}

const APIKey = '93f52b444f2f91a56f33866aef83d356';

function applyWeatherVisuals(type) {
  const assets = weatherAssets[type] || {};
  selectors.image.src = assets.icon || '';
  document.body.style.backgroundImage = assets.background ? `url("${assets.background}")` : '';
}

function showNotFound() {
  selectors.container.style.height = '600px';
  selectors.weatherBox.style.display = 'none';
  selectors.weatherDetails.style.display = 'none';
  selectors.notFound.style.display = 'block';
  selectors.notFound.classList.add('dropdownAnimation');
}

function hideNotFound() {
  selectors.notFound.style.display = 'none';
  selectors.notFound.classList.remove('dropdownAnimation');
}

function showWeather(data) {
  selectors.temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
  selectors.description.innerHTML = data.weather[0].description;
  selectors.humidity.innerHTML = `${data.main.humidity}%`;
  selectors.wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

  applyWeatherVisuals(data.weather[0].main);

  selectors.weatherBox.style.display = '';
  selectors.weatherDetails.style.display = '';
  selectors.weatherBox.classList.add('dropdownAnimation');
  selectors.weatherDetails.classList.add('dropdownAnimation');
  selectors.container.style.height = '750px';
}

selectors.button.addEventListener('click', () => {
  const city = selectors.input.value.trim();

  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
  .then(response => response.json())
  .then(data => {
    if (data.cod === '404') {
      showNotFound();
      return;
    }

    hideNotFound();
    showWeather(data);
  })
})

selectors.input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    selectors.button.click();
  }
})
