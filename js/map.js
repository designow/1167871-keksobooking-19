'use strict';
(function () {

  var X_MAX = 1100;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var MAP_PIN_HEIGHT = 85;
  var MAP_PIN_SIZE = 65;

  // Функция определения координат метки
  var setCoordinates = function (x, y, xCorrection, yCorrection) {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    x += xCorrection;
    y += yCorrection;
    return Math.round(x) + ', ' + Math.round(y);
  };

  window.map = {
    X_MAX: X_MAX,
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_SIZE: MAP_PIN_SIZE,
    setCoordinates: setCoordinates
  };
})();
