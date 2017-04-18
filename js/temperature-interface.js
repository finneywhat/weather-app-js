var apiKey = require('./../.env').apiKey;
var Temperature = require('./../js/temperature.js').temperatureModule;

$(function(){
  $('#weather-location').click(function(){
    var city = $('#location').val();
    var temp;
    var newTemperature = new Temperature();

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
     .then(function(response) {
      temp = response.main.temp;
      var currentFarenheit = newTemperature.convertKelvinToF(temp);
      $('.showFarenheit').text("The current temperature in " + city + " is " + currentFarenheit + " F.  You can expect " + response.weather[0].description + ".");
      var currentCelsius = newTemperature.convertKelvinToC(temp);
      $('.showCelsius').text("The current temperature in " + city + " is " + currentCelsius + " C");
    })

    .fail(function(error) {
      $('.showFarenheit').text(error.responseJSON.message);
    })
    .fail(function(error) {
      $('.showCelsius').text(error.responseJSON.message);
    });
  });
});
