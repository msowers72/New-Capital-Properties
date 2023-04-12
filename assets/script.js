var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
console.log(localStorage)
var stateArray = JSON.parse(localStorage.getItem("states")) || [];
// console.log(localStorage[0].state)


$("#search-btn").on("click", function (event) {
    event.preventDefault();

    var cityName = $(".city-search").val().trim();
    var stateName = $(".state-search").val().trim();
    var searchObject = {
        city: cityName,
        state: stateName,
    }

    if (cityName === "") {
        return;
    }
    console.log(cityName);
    console.log(stateName);
    // makes sure previous city isnt listed in the array
    if (cityArray.indexOf(cityName) === -1) {
        cityArray.push(cityName);
    }

    if (stateArray.indexOf(stateName) === -1) {
        stateArray.push(stateName);
    }

    console.log(cityArray);
    searchWeatherApi(cityName);
    getApi(cityName, stateName);

    localStorage.setItem("cities", JSON.stringify(cityArray));
    localStorage.setItem("states", JSON.stringify(cityArray));
    // console.log(cityArray);
});


function getApi(city, state) {
    fetch("https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=" + state + "&city=" + city + "&offset=0&limit=200&sort=relevance", {
        "method": "GET",


        "headers": {
            "x-rapidapi-key": "b2f0d79ea0mshef6e2494270b43ap1807fejsn68dd68d4adae",
            "x-rapidapi-host": "realty-in-us.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // console.log(response.listings[0].price)
            // console.log(response.listings[0].address)
            for (let i = 0; i < 6; i++) {
                // card 1
                $(".card-text" + i).text("Price: " + response.listings[i].price);
                $(".bed-text" + i).text("Bed-Rooms: " + response.listings[i].beds);
                $(".bath-text" + i).text("Bath-Rooms: " + response.listings[i].baths)
                $(".square-text" + i).text("Square-Feet: " + response.listings[i].sqft);
                $(".address-text" + i).text("Address: " + response.listings[i].address)
                $(".img" + i).attr("src", response.listings[i].photo);
                console.log(i);
                console.log("card.text" + i);
            }
        })
        .catch(err => {
            console.error(err);
        });
}


function searchWeatherApi(cityName) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=4e4346890dbabb049a4ba08f09b5e215';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.main.temp);
            console.log(data.name);
            //  console.log(data);
            $(".title").text(data.name);
            $(".text").text("Temp: ");
            $(".temp").text("Current Temp: " + data.main.temp);
            $(".footer-text1").text(data.name)
        });
}
// console.log(cityArray[0].city)

getApi("houston", "tx");
searchWeatherApi("houston");




















