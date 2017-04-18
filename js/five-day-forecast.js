function Forecast() {
}

Forecast.prototype.convertKelvinToF = function(temp) {
  return Math.round(temp * 1.8 - 459.67);
};

exports.forecastModule = Forecast;
