'use strict';
(function () {

  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var MAP_PIN_HEIGHT = 85;
  var MAP_PIN_SIZE = 65;
  var DEFAULT_PIN_COORDINATES = {
    left: '570px',
    top: '375px'
  };

  // Функция определения координат метки
  var setCoordinates = function (xCorrection, yCorrection) {
    var x = parseInt(window.util.getSelector('.map__pin--main').style.left, 10);
    var y = parseInt(window.util.getSelector('.map__pin--main').style.top, 10);
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
    setCoordinates: setCoordinates,
    DEFAULT_PIN_COORDINATES: DEFAULT_PIN_COORDINATES
  };
})();
