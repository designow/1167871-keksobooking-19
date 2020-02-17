'use strict';
(function () {
  var NOT_FOR_GUESTS = 100;
  // Количество пинов на карте
  var PIN_LIMIT = 5;
  // Строимость проживания в бунгало/квартире/доме/дворце
  var PRICES = [0, 1000, 5000, 10000];
  // Веса параметров
  var PROPERTY_RANK = {
    type: 1
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  // Обработчик успешной передачи данных с сервера
  var successHandler = function (data) {
    var pins = document.querySelectorAll('.map__pin');
    var card = document.querySelectorAll('.map__card');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
      if (card[i]) {
        card[i].remove();
      }
    }
    var pinLimit = (data.length > PIN_LIMIT) ? PIN_LIMIT : data.length;
    for (var k = 0; k < pinLimit; k++) {
      window.pin.addPinToMap(data[k], k);
      window.card.addCardToMap(data[k], k);
    }
  };

  // Функция сортировки предложений массива
  var getRank = function (data) {
    var rank = 0;
    if (data.offer.type === window.filter.filterData.type) {
      rank += PROPERTY_RANK.type;
    }
    return rank;
  };
  // Дополнительная сортировка для устранения идентичности весов
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };
  // Сортировка данных
  var sortData = function (data) {
    data.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    successHandler(data);
  };
  var updatePins = function () {
    window.backend.load(sortData, errorHandler);
  };

  window.backend.load(successHandler, errorHandler);
  window.data = {
    NOT_FOR_GUESTS: NOT_FOR_GUESTS,
    PRICES: PRICES,
    updatePins: updatePins
  };
})();
