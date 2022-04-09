
const api = {
  key: "92443a69f31a3fb5a0339dc045da1ad5",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.mySearch-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?zip=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {

  let city = document.querySelector('.myLocation .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.myLocation .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-lo');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
  
  let icon = document.querySelector('.icon');
  let icon1 = weather.weather[0].icon;
          icon.innerHTML = 
              `<img src="https://openweathermap.org/img/wn/${icon1}@2x.png" style= 'height:10rem'/>`;
  
  document.getElementsByClassName("humidity")[0].innerHTML = weather.main.humidity;
  document.getElementsByClassName("wind")[0].innerHTML = weather.wind.speed;
    }

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


