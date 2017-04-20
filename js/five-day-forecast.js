function Forecast() {
}

Forecast.prototype.convertKelvinToF = function(temp) {
  return Math.round(temp * 1.8 - 459.67);
};

Forecast.prototype.convertKelvinToC = function(temp) {
  return Math.round(temp - 273.15);
};

exports.forecastModule = Forecast;
