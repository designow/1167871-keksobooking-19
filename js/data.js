'use strict';
(function () {
  var NOT_FOR_GUESTS = 100;
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
    window.mapFlag = true;
    window.util.getSelector('.map').classList.remove('map--faded');
    window.pin.addRemovePins(data);
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
    return data;
  };

  var updatePins = function (data) {
    var sortedData = data.slice();
    sortData(sortedData);
    window.pin.addRemovePins(sortedData);
  };

  window.data = {
    NOT_FOR_GUESTS: NOT_FOR_GUESTS,
    PRICES: PRICES,
    updatePins: updatePins,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
