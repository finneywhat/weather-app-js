var apiKey = require('./../.env').apiKey;
var Forecast = require('./../js/five-day-forecast.js').forecastModule;

$(function(){
  $('#weather-location').click(function(){
    var city = $('#location').val();
    var temp0;
    var newForecast = new Forecast();

    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + apiKey + '&cnt=5')
     .then(function(response) {
      console.log(JSON.stringify(response));
      temp0 = response.list[0].main.temp;
      var currentFarenheit = newForecast.convertKelvinToF(temp0);
      $('#dayOne').text("The current temperature in " + city + " is " + currentFarenheit + " F");
     })

    .fail(function(error) {
      $('#dayOne').text(error.responseJSON.message);
    });
  });
});
