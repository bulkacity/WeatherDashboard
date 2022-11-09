// initiate upon opening
// 2365d66d33b913ca087ab8a7085c5879 api key
//To search for city in the USA: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//global variables
var apiSearchURL="https://api.openweathermap.org/data/2.5/weather?q="
var APIkey= "&units=imperial&appid=2365d66d33b913ca087ab8a7085c5879"


$(document).ready(function initiate() { 
  
  // devlare variables to be used in all nested functions
  
  //********** The following will be time variables */
  var cityName = document.querySelector("#city-name-date");
  console.log(cityName.textContent);
  let todaysDate = moment().format("l");
  console.log("Todays date is: "+todaysDate);
  let day1 = moment().add(1, "days").format("l");
  $("#date1").text(day1);
  let day2 = moment().add(2, "days").format("l");
  $("#date2").text(day2);
  let day3 = moment().add(3, "days").format("l");
  $("#date3").text(day3);
  let day4 = moment().add(4, "days").format("l");
  $("#date4").text(day4);
  let day5 = moment().add(5, "days").format("l");
  $("#date5").text(day5);
  console.log("Next days are : "+ day1+ "," + day2+ "," + day3+ "," + day4+ "," +day5);
  let city;
  let cities;
  //*** time variables end list here */

// ** THIS IS NOTE ONLY, this did not work becuase the city is not typed in untill after initiating, also should wait to click search // the following is to call and declare input from form input field
// city = $("#city-input").val();
// console.log("The city inputed is:" + city);
// /// end here

// pull storage

function loadHistory() {
  let lastSearch = localStorage.getItem("mostRecent");
  console.log("storage contains: " + lastSearch);
  if (lastSearch) {
    console.log("This is going to search last search upon opening"+ lastSearch);
    search(lastSearch);
  } else {
    HomeCity = "Miami";
    search(HomeCity);
  }
}
loadHistory();




//loadRecentCities
  function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));
    console.log(recentCities)

    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
  }

  loadRecentCities()
//end here

// the following is to call and declare input from form input field
function pullCity(){
InputCity = $("#city-input").val();
let city =InputCity.charAt(0).toUpperCase() + InputCity.slice(1).toLowerCase();
console.log("capitalized city name is "+cities);
console.log("The city inputed is:" + city);
if(cities.includes(city)===false){
  console.log(city+": Is not on list");
  saveToStorage(city);
  console.log ("after saving city is:" + city);
  console.log("City was searched, is :" + city);
  search(city);
  return city;
  
}
else if(cities.includes(city)===true){
  search(city);
  return city;

} else if (!city){
  alert("Enter a real city name.")
}
// now store, run check first against storage 

}
/// end here

// if not on storage save function
function saveToStorage(city){
  localStorage.setItem("mostRecent", city);
  cities.push(city);
  console.log("Storage length is: " + cities.length)
  localStorage.setItem("cities", JSON.stringify(cities));
}
// end save function

// function to add to visible listCities
function listCities() {
  $("#body-list").text("");
  cities.forEach(function(city) {
var row="row";
$("#body-list").append("<tr><td>" + city + "</td></tr>");
  });
}

listCities();

//end function for visible listCities

// event handeler for search, now declare the city input
// store city in local storage
// before storage, check if local storage already contains the city
// save city in local storage
// clear the input field
$("#search").on("click", function(errorCheck){
  errorCheck.preventDefault();
  pullCity();
  $("#city-input").val("");
  listCities();
});


//end here


function search(city){
  let cityURL=apiSearchURL+city+ APIkey;
  console.log(cityURL);

  fetch(cityURL,{
    method: "GET",
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    console.log(data.main.feels_like)

    let cityName= data.name ;
    console.log("city name" + cityName);
    let cityCond =data.weather[0].description.toUpperCase();
    console.log("city cond" +cityCond);
    let cityTemp = data.main.temp;
    console.log("city temp" + cityTemp);
    let cityHum = data.main.humidity;
    console.log("cityHum" + cityHum);
    let cityWind = data.wind.speed;
    console.log("cityWind" + cityWind);
    let icon = data.weather[0].icon;
    console.log("icon" + icon);
    let geolat=data.coord;
    console.log("lon : " + geolat.lon )
    console.log("lat : " + geolat.lat )


    $("#city-name-date").html("City of " + cityName + " on " + " " + todaysDate + ".");
    $("#city-cond").text("Current Conditions: " + cityCond);
    $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
    $("#humidity").text("Humidity: " + cityHum + "%");
    $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
    $("#icon").html(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);

    defineNextDays(geolat.lon,geolat.lat)
  })
 
// The following will now generate an array of objects when fetching data from the server
  function defineNextDays(lon,lat){

//https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
let geoLocatedays1="https://api.openweathermap.org/data/2.5/forecast?lat=";
let geoLocatedays2="&lon=";
let geoLocatedays3="&appid=2365d66d33b913ca087ab8a7085c5879&units=imperial&cnt=41";

let cityURLlatLon=geoLocatedays1 + lat + geoLocatedays2 + lon + geoLocatedays3;
 console.log(cityURLlatLon);

fetch(cityURLlatLon,{
  method: "GET",
})
.then(function(response2){
  return response2.json();
})
.then(function(data2){
  console.log(data2);
  console.log(data2.list[0])
  let fiveDayquery=[];
  for (i=0;i < 40 ; i+=8){
    fiveDayquery.push(data2.list[i]);
  }
  console.log(fiveDayquery);
});

}

// After fetching END



} //<!-- the bracket is for the search fucntion-->
  


  });