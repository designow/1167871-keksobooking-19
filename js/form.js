'use strict';
(function () {
  // Строимость проживания в бунгало/квартире/доме/дворце
  var PRICES = [0, 1000, 5000, 10000];
  var ESC_KEY = 'Escape';
  var FORM_ELEMENTS = [
    '.ad-form fieldset',
    '.map__filters select',
    '.map__filters fieldset'
  ];
  // Флаг определяющий включение карты
  window.mapFlag = false;

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

  // Отключаем элементы формы
  setDisableToggle(FORM_ELEMENTS, 'add');

  var activateForm = function () {
    setDisableToggle(FORM_ELEMENTS, 'remove');
    window.util.getSelector('.ad-form').classList.remove('ad-form--disabled');
  };

  window.util.getSelector('.map__pin--main').addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.mapFlag === false) {
      activateForm();
      window.backend.load(window.data.successHandler, window.data.errorHandler);
    }
  });

  window.util.getSelector('.map__pin--main').addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateForm();
      window.backend.load(window.data.successHandler, window.data.errorHandler);
    }
  });

  // Установка координат в поле адрес
  window.util.getSelector('#address').value = window.map.setCoordinates(
      window.map.MAP_PIN_SIZE / 2,
      window.map.MAP_PIN_SIZE / 2);


  // Функция установки минимального значения для поля цена
  var setPrice = function (index) {
    window.util.getSelector('#price').setAttribute('min', PRICES[index]);
    window.util.getSelector('#price').setAttribute('placeholder', PRICES[index]);
  };

  setPrice(window.util.getSelector('#type').options.selectedIndex);
  window.util.getSelector('#type').addEventListener('change', function () {
    setPrice(window.util.getSelector('#type').options.selectedIndex);
  });

  // Синхронизация заезда - выезда
  window.util.getSelector('#timein').addEventListener('change', function () {
    window.util.getSelector('#timeout').options.selectedIndex = window.util.getSelector('#timein').options.selectedIndex;
  });

  window.util.getSelector('#timeout').addEventListener('change', function () {
    window.util.getSelector('#timein').options.selectedIndex = window.util.getSelector('#timeout').options.selectedIndex;
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

  window.util.getSelector('#room_number').addEventListener('change', function () {
    setGuests(window.util.getSelector('#room_number').value);
  });

  setGuests(window.util.getSelector('#room_number').value);
  // Сброс состояния приложения
  var resetHandler = function () {
    form.reset();
    window.util.getSelector('.map__filters').reset();
    // Удаляем все пины и карточки с карты
    window.pin.addRemovePins();
    // Возвращаем карту в исходное состояние
    window.util.getSelector('.map').classList.add('map--faded');
    window.util.getSelector('.map__pin--main').style.left = window.map.DEFAULT_PIN_COORDINATES.left;
    window.util.getSelector('.map__pin--main').style.top = window.map.DEFAULT_PIN_COORDINATES.top;
    window.mapFlag = false;

    // Установка координат в поле адрес
    window.util.getSelector('#address').value = window.map.setCoordinates(
        window.map.MAP_PIN_SIZE / 2,
        window.map.MAP_PIN_SIZE / 2);
    // Включаем оверлей формы
    window.util.getSelector('.ad-form').classList.add('ad-form--disabled');
    // Отключаем элементы формы
    setDisableToggle(FORM_ELEMENTS, 'add');
  };
  var form = document.querySelector('.ad-form');
  // Управляемый сброс формы объявления
  window.util.getSelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    resetHandler();
  });

  // Передача данных формы в AJAX для загрузки на сервер
  // Слушатель отправки формы
  form.addEventListener('submit', function (evt) {
    var errorHandler = function () {
      var fragment = document.createDocumentFragment();
      var succesTemplate = window.util.getSelector('#error').content;
      fragment.appendChild(succesTemplate.cloneNode(true));
      window.util.getSelector('main').appendChild(fragment);
      var closeErrorHandler = function (evnt) {
        if (evnt.type === 'keydown' && evnt.key === ESC_KEY || evnt.type === 'click') {
          if (window.util.getSelector('.error')) {
            window.util.getSelector('.error').remove();
          }
        }
      };
      window.util.getSelector('.error').addEventListener('click', closeErrorHandler);
      document.addEventListener('keydown', closeErrorHandler);
    };
    var successHandler = function () {
      resetHandler();
      var fragment = document.createDocumentFragment();
      var succesTemplate = window.util.getSelector('#success').content;
      fragment.appendChild(succesTemplate.cloneNode(true));
      window.util.getSelector('main').appendChild(fragment);
      var closeHandler = function (eventData) {
        if (eventData.type === 'keydown' && eventData.key === ESC_KEY || eventData.type === 'click') {
          window.util.getSelector('.success').remove();
        }
      };
      window.util.getSelector('.success').addEventListener('click', closeHandler);
      document.addEventListener('keydown', closeHandler);
    };
    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });
})();
