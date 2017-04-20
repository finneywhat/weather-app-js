var apiKey = require('./../.env').apiKey;
var Forecast = require('./../js/five-day-forecast.js').forecastModule;
// var DayString = require('./../js/day-string.js').dayStringModule;

$(function(){
  $('#weather-location').click(function(){
    var zip = $('#location').val();
    var newForecast = new Forecast();
    var city;
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zip + '&appid=' + apiKey + '&cnt=5')
     .then(function(response) {
      console.log(JSON.stringify(response));

      for (var i = 0; i < 5; i++) {
        minTemp = response.list[i].temp.min;
        maxTemp = response.list[i].temp.max;
        icon = response.list[i].weather[0].icon;
        var epoch = new Date(response.list[i].dt * 1000);
        var minFarenheit = newForecast.convertKelvinToF(minTemp);
        var maxFarenheit = newForecast.convertKelvinToF(maxTemp);
        $('#img'+(i+1)).empty();
        $('#img'+(i+1)).append('<img src=http://openweathermap.org/img/w/' + icon + '.png><hr class="no-margin">');
        $('#day'+(i+1)).empty();
        $('#day'+(i+1)).append("Low - " + minFarenheit + "*F <br>High - " + maxFarenheit + "*F");
        $('#box'+(i+1)).text(days[epoch.getDay()] + " " + epoch.getDate());
      }
      $('.forecast').show();
    })

    .fail(function(error) {
      $('.forecast').show();
      for (var i = 1; i <= 5; i++) {
        $('#day'+i).text("Something broke");
      }
    });
  });
});
