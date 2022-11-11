// initiate upon opening
// 2365d66d33b913ca087ab8a7085c5879 api key
//To search for city in the USA: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//global variables
var apiSearchURL="https://api.openweathermap.org/data/2.5/weather?q="
var APIkey= "&units=imperial&appid=2365d66d33b913ca087ab8a7085c5879"
let city;
let cities;

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

  
  loadHistory();
  

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
  loadRecentCities();
}





//loadRecentCities
  function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));
    console.log(recentCities)

    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
    listCities();
  }

  
//end here

// the following is to call and declare input from form input field
function pullCity(){
InputCity = $("#city-input").val();
let city =InputCity.charAt(0).toUpperCase() + InputCity.slice(1).toLowerCase();
console.log("capitalized city name is "+cities);
console.log("The city inputed is:" + city);
if(city && cities.includes(city)===false){
  console.log(city+": Is not on list");
  saveToStorage(city);
  console.log ("after saving city is:" + city);
  console.log("City was searched, is :" + city);
  search(city);
  return city;
  
}
else if(cities.includes(city)===true){
  search(city);
  return ;

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
  $("#body-list").empty();
  cities.forEach(function(city) {
console.log(cities.length)
$("#body-list").append("<tr><td class='cityNames'>" + city + "</td></tr>");
})
const cityNamesList= document.querySelectorAll('.cityNames');
cityNamesList.forEach(cityname =>{
  console.log('eventCreated')
  cityname.addEventListener('click',function(){
    console.log(this);
     let listedCity = $(this).text();
     console.log("clicked"+ listedCity.length);
     console.log(listedCity);
     search(listedCity);
})
})
  };




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
  
  loadHistory();
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
    let cityMaxTemp = data.main.temp_max;
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
    $("#high").text("Max Temp (F): " + cityMaxTemp.toFixed(1));
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
  console.log("the max temp for day1 is : " + fiveDayquery[0].main.temp_max)
  let tempMaxd1= fiveDayquery[0].main.temp_max;
  $("#temp1").text(tempMaxd1+ " deg");
  let hum1= fiveDayquery[0].main.humidity;
  $("#hum1").text("Humidity: " + hum1);
  console.log("icon " + fiveDayquery[0].weather[0].icon)
  icon1=fiveDayquery[0].weather[0].icon;
  $("#icon1").html(`<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`);
  des1=fiveDayquery[0].weather[0].description;
  $("#des1").text(des1);
  let wind1= fiveDayquery[0].wind.speed;
  $("#wind1").text("Wind Speeds: "+ wind1 + " mph");


  console.log("the max temp for day2 is : " + fiveDayquery[1].main.temp_max)
  let tempMaxd2= fiveDayquery[1].main.temp_max;
  $("#temp2").text(tempMaxd2+ " deg");
  let hum2= fiveDayquery[1].main.humidity;
  $("#hum2").text("Humidity: " + hum2);
  icon2=fiveDayquery[1].weather[0].icon;
  $("#icon2").html(`<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`);
  des2=fiveDayquery[1].weather[0].description;
  $("#des2").text(des2);
  let wind2= fiveDayquery[1].wind.speed;
  $("#wind2").text("Wind Speeds: "+ wind2 + " mph");


  console.log("the max temp for day3 is : " + fiveDayquery[2].main.temp_max)
  let tempMaxd3= fiveDayquery[2].main.temp_max;
  $("#temp3").text(tempMaxd3+ " deg");
  let hum3= fiveDayquery[2].main.humidity;
  $("#hum3").text("Humidity: " + hum3);
  icon3=fiveDayquery[2].weather[0].icon;
  $("#icon3").html(`<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`);
  des3=fiveDayquery[2].weather[0].description;
  $("#des3").text(des3);
  let wind3= fiveDayquery[2].wind.speed;
  $("#wind3").text("Wind Speeds: "+ wind3 + " mph");


  console.log("the max temp for day4 is : " + fiveDayquery[3].main.temp_max)
  let tempMaxd4= fiveDayquery[3].main.temp_max;
  $("#temp4").text(tempMaxd4+ " deg");
  let hum4= fiveDayquery[3].main.humidity;
  $("#hum4").text("Humidity: " + hum4);
  icon4=fiveDayquery[3].weather[0].icon;
  $("#icon4").html(`<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`);
  des4=fiveDayquery[3].weather[0].description;
  $("#des4").text(des4);
  let wind4= fiveDayquery[3].wind.speed;
  $("#wind4").text("Wind Speeds: "+ wind4 + " mph");


  console.log("the max temp for day5 is : " + fiveDayquery[4].main.temp_max)
  let tempMaxd5= fiveDayquery[4].main.temp_max;
  $("#temp5").text(tempMaxd5+ " deg");
  let hum5= fiveDayquery[4].main.humidity;
  $("#hum5").text("Humidity: " + hum5);
  icon5=fiveDayquery[4].weather[0].icon;
  $("#icon5").html(`<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`);
  des5=fiveDayquery[4].weather[0].description;
  $("#des5").text(des5);
  let wind5= fiveDayquery[4].wind.speed;
  $("#wind5").text("Wind Speeds: "+ wind5 + " mph");
});

}

// After fetching END



} //<!-- the bracket is for the search fucntion-->
  

});

// var cityNames = document.querySelector(".cityNames");
// console.log("this should be done" +cityNames);
// cityNames.click(function(){
//   console.log(this);
//    let listedCity = $(this).text();
//    console.log("clicked"+ listedCity.length);
//    console.log(listedCity);
//    search(listedCity);
//  });
 


// the following is going to be the event handeler for a clear button

$("#Clear").click(function() {
  localStorage.removeItem("cities");
  localStorage.removeItem("mostRecent");
  history.go(0);
});

  