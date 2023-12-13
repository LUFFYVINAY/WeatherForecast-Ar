const apiKey = "44cb7bd3b32fe9cbd33059d13203f635";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const chairModel = "https://cdn.glitch.global/30ecf31c-8368-4d9d-a992-4edc2e215e8a/chair.glb?v=1682149012569";
const astronautModel = "https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2FAstronaut.glb?v=1542147958948";

const rainyModel = "https://cdn.glitch.global/30ecf31c-8368-4d9d-a992-4edc2e215e8a/rainy_earth.glb?v=1682239047728";
const clearModel = "https://cdn.glitch.global/30ecf31c-8368-4d9d-a992-4edc2e215e8a/clear_earth.glb?v=1682242848865";
const cloudModel = "https://cdn.glitch.global/30ecf31c-8368-4d9d-a992-4edc2e215e8a/cloud_earth.glb?v=1682242909459";
const snowModel = "https://cdn.glitch.global/30ecf31c-8368-4d9d-a992-4edc2e215e8a/snow_earth.glb?v=1682242989278";
const mistModel = "https://cdn.glitch.global/30ecf31c-8368-4d9d-a992-4edc2e215e8a/mist_earth.glb?v=1682243078214";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const modelViewer = document.querySelector('model-viewer');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    // modelViewer.setAttribute('src', rainyModel);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "° C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".lbl").innerHTML = data.name + " " + Math.round(data.main.temp) + "°C";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            modelViewer.setAttribute('src', cloudModel);
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            modelViewer.setAttribute('src', clearModel);
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            modelViewer.setAttribute('src', rainyModel);
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            modelViewer.setAttribute('src', rainyModel);
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
            modelViewer.setAttribute('src', mistModel);
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})