var apiKey = require('./../.env').apiKey;
var Temperature = require('./../js/temperature.js').temperatureModule;

$(function(){
  $('#weather-location').click(function(){
    var zip = $('#location').val();
    $('#location').empty();
    var newTemperature = new Temperature();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    $('.alert').hide();
    $.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&appid=' + apiKey)
     .then(function(response) {
       var epoch = new Date(response.dt * 1000);
       var city = response.name;
       var icon = response.weather[0].icon;
       var temp = response.main.temp;
       var winds = response.wind.speed;
       var degree = response.wind.deg;
       var lat = response.coord.lat;
       var long = response.coord.lon;
       console.log(lat, long);
       var currentTemp = newTemperature.convertKelvinToF(temp);
       var windDegree = newTemperature.degreeToCardinalDirection(degree);
       var time = newTemperature.twelveHourTime(epoch.getHours());
       var humidity = response.main.humidity;
       $('#cityName').text(city);
       $('#currentDay').text(days[epoch.getDay()] + " " + months[epoch.getMonth()] + " " + epoch.getDate() + " " + time + ':' + epoch.getMinutes());
       console.log(epoch.getDate());
       console.log(epoch);
       console.log(days[1]);
       $('#currentIcon').empty().append('<img src=http://openweathermap.org/img/w/' + icon + '.png>');
       $('#currentTemp').text(currentTemp + '°F');
       $('#currentHumidity').text('Humidity - ' + humidity + '%');
       $('#currentWinds').text('Winds - ' + winds + ' ' + windDegree);
      $('.showFarenheit').show();
    })
    .fail(function(error) {
      $('.alert').show();
    });
    $('window').scroll()
  });
});
