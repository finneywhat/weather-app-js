var apiKey = require('./../.env').apiKey;
var Forecast = require('./../js/five-day-forecast.js').forecastModule;
// var DayString = require('./../js/day-string.js').dayStringModule;

$(function(){
  $('#five-day-btn').click(function(){
    var zip = $('#location').val();
    var newForecast = new Forecast();
    var city;
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    $('.alert').hide();
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
        $('#img'+(i+1)).empty().append('<img src=http://openweathermap.org/img/w/' + icon + '.png><hr class="no-margin">');
        $('#day'+(i+1)).empty().append("High - " + maxFarenheit + "°F <br>Low - " + minFarenheit + "*F");
        $('#box'+(i+1)).text(days[epoch.getDay()] + " " + months[epoch.getMonth()] + " " + epoch.getDate());
      }
      $('.forecast').show();
    })

    .fail(function(error) {
      $('.alert').show();
    });

    var map;
    function initMap() {
      // Create a map object and specify the DOM element for display.
      map = new google.maps.Map(document.getElementById('map-viewport'), {
        center: {lat: 45.5234, lng: -122.6763},
        scrollwheel: false,
        zoom: 10
      });
    }
  });
});
