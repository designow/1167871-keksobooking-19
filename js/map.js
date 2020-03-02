'use strict';
(function () {

  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var PIN_HEIGHT = 85;
  var PIN_SIZE = 65;
  var defaultPinCoordinates = {
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
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_SIZE: PIN_SIZE,
    setCoordinates: setCoordinates,
    defaultPinCoordinates: defaultPinCoordinates
  };
})();
