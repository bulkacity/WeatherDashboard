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
  let day2 = moment().add(2, "days").format("l");
  let day3 = moment().add(3, "days").format("l");
  let day4 = moment().add(4, "days").format("l");
  let day5 = moment().add(5, "days").format("l");
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
    city = lastSearch;
    //search();
  } else {
    city = "Miami";
    //search();
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

// event handeler for search, now declare the city input
// store city in local storage
// before storage, check if local storage already contains the city
// save city in local storage
// clear the input field
$("#search").on("click", (e) => {
  e.preventDefault();
  pullCity();
  search();
  $("#city-input").val("");
  //listCities();
});


//end here






// the following is to call and declare input from form input field
function pullCity(){
city = $("#city-input").val();
console.log("The city inputed is:" + city);
if(city && cities.includes(city)===false){
  console.log(city+": Is not on list");
  saveToStorage();
  return city;

} else if (!city){
  alert("Enter a real city name.")
}
// now store, run check first against storage 

}
/// end here

// if not on storage save function
function saveToStorage(){
  localStorage.setItem("mostRecent", city);
  cities.push(city);
  console.log("Storage length is: " + cities.length)
  localStorage.setItem("cities", JSON.stringify(cities));
}
// end save function

// function to add to visible listCities
function listCities() {
  $("#body-list").text("");
  cities.forEach((city) => {
var row="row";
$("#body-list").append("<tr><td>" + city + "</td></tr>");
  });
}

listCities();

//end function for visible listCities

function search(){
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
    let cityCond =data.weather[0].description.toUpperCase();
    let cityTemp = data.main.temp;
    let cityHum = data.main.humidity;
    let cityWind = data.wind.speed;
    let icon = data.weather[0].icon;

    $("#city-name-date").html("City of " + cityName + " on " + " " + todaysDate + ".");
    $("#city-cond").text("Current Conditions: " + cityCond);
    $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
    $("#humidity").text("Humidity: " + cityHum + "%");
    $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
  })
  
} //<!-- the bracket is for the search fucntion-->
  


  });