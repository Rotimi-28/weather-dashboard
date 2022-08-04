// create variable and select the div where the response will be display
var cityformE1 = document.querySelector("#city-form");
var cityInputE1 = document.querySelector("#cityname");
var cityContainer = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#ciy-search-term");
var tempContainer = document.querySelector("#today-temp");
var searchHistory = document.querySelector("#search-history")
var forecastContainer = document.querySelector("#forecast-container");
var fBox1 = document.querySelector("#forecastBox1");

var formSubmitHandler = function(event) {
    event.preventDefault()

    //get input value
    var cityname = cityInputE1.value.trim();
    if (!cityname) {
        cityInputE1.value = "";
        cityContainer.textContent = "please enter city";
    } else {
        citySearchTerm.innerHTML = "";
       

        cityInputE1.value = "";
        getCityWeather(cityname);
    }
};

var getForecast = function(lat, lon) {
    //the forecasr api
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?" +
                      "&lat=" + lat +
                      "&lon" + lon +
                      "&exclude=minutely,hourly?q=" +
                      "&appid=dff32d49f903ec23ca2e10dc6f168410&units=imperial";
    // request forecast url
    fetch(forecastUrl).then(function(response) {
        console.log(response)
        if (response.ok) {
            return response.json()

            .then(function(response) {
                console.log(response.daily);
                for (var i =0; i < response.daily.length; i++) {
                    var day = response.daily[1].temp.day;
                    var dayHumidity = response.daily[1].humidity;
                    var dayWind = response.daily[i].wind_speed;

                    //create day conatainer and append to dom
                    var forecastDay = document.createElement("div")
                    forecastContainer.appendChild(forecastDay);
                    //create & append day
                    var dayE1 = document.createElement("p");
                    dayE1.textContent = day;
                    forecastDay.appendChild(dayE1);

                    //create & append temp
                    var tempE1 = document.createElement("p");
                    humidityE1.textContent = dayHumidity;
                    forecastDay.appendChild(humidityE1);


                    //create & append wind
                    var windE1 = document.createElement("p");
                    windE1.textContent = dayWind;
                    forecastDay.appendChild(windE1);
                }
            })
        } else {
            //empty div
            //
        }
    })
}

var getCityWeather = function(cityname) {
    //format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?" +
                 cityname +
                 "&appid=dff32d49f903ec23ca2e10dc6f168410&units=imperial";
        
                 //request the url
            fetch(apiUrl).then(function(response) {
                console.log(response)
                if (response.ok) {
                    return response.json()

                .then(function(response) {
                    //Empty out div
                    tempContainer.innerHTML = "";

                    //get lat & lon needed forescast
                    var lat = response.coord.lat;
                    var lon = response.coord.lon;
                    console.log(lat)
                    console.log(lon)
                    getForecast(lat, lon)

                    //create & dislplay
                    var degree = document.createElement("h4");
                    var hemf = (response.main.temp - 273.15) * 1.80 +32;
                    tempContainer.appendChild(degree);

                    var humidity = document.createElement("h4");
                    humidity.textContent = "Humidity is: " +
                     response.main.humidity + " percent"
                     tempContainer.appendChild(humidity);

                     var wind = document.createElement("h4");
                     wind.textContent = "Wind Speed is: " + response.wind.speed + "mph"
                     tempContainer.appendChild(wind);
                })

                } else {
                    //empty
                    citySearchTerm.innerHTML = "";
                    cityContainerE1.innerHTML = "";
                    cityContainerE1.textContent = "No city found";
                };
            })
            .catch(function(error) {
                cityContainerE1.innerHTML= "";
                cityContainerE1.textContent = "unable to connect to api";
            });

            citySearchTerm.textContent = cityname.toUpperCase().charAt(0) + cityname.slice(1);

            console.log(cityname);

            var searchHistoryEl = document.createElement("li");
            searchHistoryE1.classAnme = "card";
            searchHistoryE1.textContent = cityname.toUpperCase().charAt(0) + cityname.slice(1);
            historySearch.appendChild(searchHistoryEl);

}

cityformE1.addEventListener("submit", formSubmitHandler);

