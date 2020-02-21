'use strict';
(function () {
  // Значения фильтров
  var filterData = {
    features: []
  };
  var housingElements = [
    'housing-type',
    'housing-price',
    'housing-rooms',
    'housing-guests',
  ];
  var filterElements = [
    'filter-wifi',
    'filter-dishwasher',
    'filter-parking',
    'filter-washer',
    'filter-elevator',
    'filter-conditioner'
  ];

  // Задаем обработчики для сбора информации по выпадающим меню
  var addHousingElement = function (i) {
    window.util.getSelector('#' + housingElements[i]).addEventListener('change', function () {
      filterData[housingElements[i]] = window.util.getSelector('#' + housingElements[i]).value;
      window.data.updatePins(window.serverData);
    });
  };
  // Задаем обработчики для сбора информации по фитчам
  var addFilterElement = function (i) {
    window.util.getSelector('#' + filterElements[i]).addEventListener('change', function () {
      filterData.features[i] = window.util.getSelector('#' + filterElements[i]).value;
      // Проверка снятия галочки с фильтра и удаление параметра из фильтра
      if (!window.util.getSelector('#' + filterElements[i]).checked) {
        delete filterData.features[i];
      }
      window.data.updatePins(window.serverData);
    });
  };

  for (var i = 0; i < housingElements.length; i++) {
    addHousingElement(i);
  }

  for (i = 0; i < filterElements.length; i++) {
    addFilterElement(i);
  }


  window.filter = {
    filterData: filterData
  };
})();
