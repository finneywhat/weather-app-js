var apiKey = require('./../.env').apiKey;
var Temperature = require('./../js/temperature.js').temperatureModule;

$(function(){
  $('#weather-location').click(function(){
    var zip = $('#location').val();
    var temp;
    var newTemperature = new Temperature();
    var city;
    var date = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zip + '&appid=' + apiKey)
     .then(function(response) {
      temp = response.list[0].temp.day;
      city = response.city.name;
      var currentFarenheit = newTemperature.convertKelvinToF(temp);
      $('.showFarenheit').text("Today is " + days[date.getDay()] + ". The current temperature in " + city + " is " + currentFarenheit + "*F.");
    })

    .fail(function(error) {
      $('.showFarenheit').text("Sorry - looks like you broke something!");
    });
  });
});
