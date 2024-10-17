const apiKey = "c0471161c9243c6cfbac68c2d1414fce";        
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const searchIcon = document.querySelector(".search img");  // Assuming there's an <img> inside the button

async function checkWeather(city) {
    if (!city) {
        document.querySelector(".error").innerHTML = "Please enter a city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    searchBtn.disabled = true;
    searchIcon.src = "images/loading.gif";  // Change button image to a loading spinner or something

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").innerHTML = "City not found. Please check the spelling.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
            
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        document.querySelector(".error").innerHTML = "Unable to fetch data. Please try again later.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } finally {
        // Reset button after data fetch completes
        searchBtn.disabled = false;
        searchIcon.src = "images/search.png";  // Change the button image back to the search icon
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
