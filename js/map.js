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
    Y_MIN, Y_MIN,
    Y_MAX, Y_MAX,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_SIZE: MAP_PIN_SIZE,
    setCoordinates: setCoordinates
  };

  // Функция добавления пинов на карту
  // var addToMap = function () {
  //   var fragment = document.createDocumentFragment();
  //   var pinTemplate = window.core.getSelector('#pin').content;
  //   for (var i = 0; i < mocks.length; i++) {
  //     var pinForAdd = pinTemplate.cloneNode(true);
  //     var pinImg = pinForAdd.querySelector('img');
  //     var pinButton = pinForAdd.querySelector('.map__pin');
  //     pinButton.style = 'left: ' + (mocks[i].offer.location.x + MAP_PIN_SIZE/2) + 'px; top: ' + (mocks[i].offer.location.y + MAP_PIN_HEIGHT) + 'px';
  //     pinImg.src = mocks[i].author.avatar;
  //     pinImg.alt = mocks[i].offer.title;
  //     fragment.appendChild(pinForAdd);
  //   }
  //   // Добавляем пины на карту
  //   window.core.getSelector('.map__pins').appendChild(fragment);
  // };

  // Выводим предложения на карту
  // addToMap();
})();
