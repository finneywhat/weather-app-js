var apiKey = require('./../.env').apiKey;
var Forecast = require('./../js/five-day-forecast.js').forecastModule;
// var DayString = require('./../js/day-string.js').dayStringModule;

$(function(){
  $('#weather-location').click(function(){
    var zip = $('#location').val();
    var newForecast = new Forecast();
    var city;
    var epoch = new Date();

    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zip + '&appid=' + apiKey + '&cnt=5')
     .then(function(response) {
      // console.log(JSON.stringify(response));

      for (var i = 0; i < 5; i++) {
        minTemp = response.list[i].temp.min;
        maxTemp = response.list[i].temp.max;
        icon = response.list[i].weather[0].icon;
        epoch = Date(response.list[i].dt);
        var minFarenheit = newForecast.convertKelvinToF(minTemp);
        var maxFarenheit = newForecast.convertKelvinToF(maxTemp);
        $('#img'+(i+1)).append('<img src=http://openweathermap.org/img/w/' + icon + '.png>');
        $('#day'+(i+1)).text("Temperature: Low today in " + zip + " will be " + minFarenheit + "*F with a high of " + maxFarenheit + "*F.");
        $('#box'+(i+1)).text(epoch);
      }
      $('.forecast').show();
    })

    .fail(function(error) {
      $('.forecast').show();
      $('#day1').text("Something broke");
    });
  });
});
