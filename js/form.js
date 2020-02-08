'use strict';
(function () {
  var FORM_ELEMENTS = [
    '.ad-form fieldset',
    '.map__filters select',
    '.map__filters fieldset'
  ];

  // Функция отключения/включения элементов формы
  var setDisableToggle = function (data, toggle) {
    for (var i = 0; i < data.length; i++) {
      var selectors = document.querySelectorAll(data[i]);
      for (var j = 0; j < selectors.length; j++) {
        if (toggle === 'add') {
          selectors[j].setAttribute('disabled', 'disabled');
        } else {
          selectors[j].removeAttribute('disabled');
        }
      }
    }
  };

  // Отключаем элементы форм
  setDisableToggle(FORM_ELEMENTS, 'add');

  var activateForm = function () {
    setDisableToggle(FORM_ELEMENTS, 'remove');
    window.core.getSelector('.map').classList.remove('map--faded');
    window.core.getSelector('.ad-form').classList.remove('ad-form--disabled');
    window.core.getSelector('#address').value = window.map.setCoordinates(
        window.core.getSelector('.map__pin--main').style.left,
        window.core.getSelector('.map__pin--main').style.top,
        window.map.MAP_PIN_SIZE / 2,
        window.map.MAP_PIN_HEIGHT);
  };

  window.core.getSelector('.map__pin--main').addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activateForm();
    }
  });

  window.core.getSelector('.map__pin--main').addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateForm();
    }
  });


  window.core.getSelector('#address').value = window.map.setCoordinates(
      window.core.getSelector('.map__pin--main').style.left,
      window.core.getSelector('.map__pin--main').style.top,
      window.map.MAP_PIN_SIZE / 2,
      window.map.MAP_PIN_SIZE / 2);


  // Функция установки минимального значения для поля цена
  var setPrice = function (index) {
    window.core.getSelector('#price').setAttribute('min', window.data.PRICES[index]);
    window.core.getSelector('#price').setAttribute('placeholder', window.data.PRICES[index]);
  };

  setPrice(window.core.getSelector('#type').options.selectedIndex);
  window.core.getSelector('#type').addEventListener('change', function () {
    setPrice(window.core.getSelector('#type').options.selectedIndex);
  });

  // Синхронизация заезда - выезда
  window.core.getSelector('#timein').addEventListener('change', function () {
    window.core.getSelector('#timeout').options.selectedIndex = window.core.getSelector('#timein').options.selectedIndex;
  });

  window.core.getSelector('#timeout').addEventListener('change', function () {
    window.core.getSelector('#timein').options.selectedIndex = window.core.getSelector('#timeout').options.selectedIndex;
  });

  // Управление числом гостей
  var setGuests = function (rooms) {
    var capacity = document.querySelectorAll('#capacity option');
    rooms = (parseInt(rooms, 10) === window.data.NOT_FOR_GUESTS) ? rooms = 0 : rooms = parseInt(rooms, 10);
    for (var i = 0; i < capacity.length; i++) {

      var currentItem = parseInt(capacity[i].value, 10);

      capacity[i].removeAttribute('disabled');
      capacity[i].removeAttribute('selected');

      if (currentItem > rooms || currentItem === 0) {
        capacity[i].setAttribute('disabled', 'disabled');
      }

      if (currentItem === rooms) {
        capacity[i].removeAttribute('disabled');
        capacity[i].setAttribute('selected', 'selected');
      }
    }
  };

  window.core.getSelector('#room_number').addEventListener('change', function () {
    setGuests(window.core.getSelector('#room_number').value);
  });

  setGuests(window.core.getSelector('#room_number').value);
})();
