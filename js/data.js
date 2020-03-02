'use strict';
(function () {
  var NOT_FOR_GUESTS = 100;
  // Веса параметров
  var PropertiesRank = {
    'housing-typetype': 2,
    'housing-price': 2,
    'housing-rooms': 1,
    'housing-guests': 1,
    'wifi': 1,
    'dishwasher': 1,
    'parking': 1,
    'washer': 1,
    'elevator': 1,
    'conditioner': 1
  };
  // Определяем числовые значения для понятий цены low, middle, high
  var PriceData = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Number.MAX_VALUE
    }
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

    // Фильтрация типа жилья
    if (data.offer.type === window.filter.filterData['housing-type']) {
      rank += PropertiesRank['housing-typetype'];
    }

    // Фильтрация количества комнат
    if (data.offer.rooms === parseInt(window.filter.filterData['housing-rooms'], 10)) {
      rank += PropertiesRank['housing-rooms'];
    }

    // Фильтрация количества гостей
    if (data.offer.guests >= parseInt(window.filter.filterData['housing-guests'], 10)) {
      rank += PropertiesRank['housing-guests'];
    }

    // Фильтрация наличие фитч
    for (var i = 0; i < data.offer.features.length; i++) {
      if (window.filter.filterData.features.indexOf(data.offer.features[i]) !== -1) {
        rank += PropertiesRank[data.offer.features[i]];
      }
    }
    // Фильтрация стоимости аренды
    if (PriceData.hasOwnProperty(window.filter.filterData['housing-price'])) {
      if (data.offer.price >= PriceData[window.filter.filterData['housing-price']].min && data.offer.price <= PriceData[window.filter.filterData['housing-price']].max) {
        rank += PropertiesRank['housing-price'];
      }
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
  // Сортировка данных в соответствии с настройками фильтра
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
  // Промежуточная функция: копируем данные и отправляем клон на сортировку, далее вызываем перерисовку
  var updatePins = window.debounce(function (data) {
    var sortedData = data.slice();
    sortData(sortedData);
    window.pin.addRemovePins(sortedData);
  });

  window.data = {
    NOT_FOR_GUESTS: NOT_FOR_GUESTS,
    updatePins: updatePins,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
