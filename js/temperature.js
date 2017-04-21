function Temperature(){
}

Temperature.prototype.convertKelvinToF = function(temp) {
  return Math.round(temp * 1.8 - 459.67);
};

Temperature.prototype.convertKelvinToC = function(temp) {
  return Math.round(temp - 273.15);
};

Temperature.prototype.degreeToCardinalDirection = function(deg) {
  var val = parseInt(((deg/22.5) + 0.5));
  var arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  return arr[(val % 16)];
};

Temperature.prototype.twelveHourTime = function(time) {
  if (time >= 13) {
    return time - 12;
  } else {
    return time;
  }
}

exports.temperatureModule = Temperature;
