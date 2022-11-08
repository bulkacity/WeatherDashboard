// initiate upon opening
// 2365d66d33b913ca087ab8a7085c5879 api key
//To search for city in the USA: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//global variables
var apiSearchURL="https://api.openweathermap.org/data/2.5/weather?q="
var APIkey= "2365d66d33b913ca087ab8a7085c5879"


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
//*** time variables end list here */

  });