var apiKey = require('./../.env').apiKey;
var Temperature = require('./../js/temperature.js').temperatureModule;

$(function(){
  $('#weather-location').click(function(){
    var zip = $('#location').val();
    var temp;
    var newTemperature = new Temperature();
    var city;
    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zip + '&appid=' + apiKey)
     .then(function(response) {
      temp = response.list[0].temp.day;
      city = response.city.name;
      var currentFarenheit = newTemperature.convertKelvinToF(temp);
      $('.showFarenheit').text("The current temperature in " + city + " is " + currentFarenheit + " F.  You can expect.");
    })

    .fail(function(error) {
      $('.showFarenheit').text("Sorry - looks like you broke something!");
    });
  });
});
