var apiKey = require('./../.env').apiKey;

$(function(){
  $('#weather-location').click(function(){
    var city = $('#location').val();


    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
     .then(function(response) {
      $('.showWeather').text("The current temperature in " + city + " is " + Math.round(response.main.temp) + " K");
      console.log(JSON.stringify(response));
    })

     .fail(function(error) {
       $('.showWeather').text(error.responseJSON.message);
     });
  });
});
