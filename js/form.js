'use strict';
(function () {
  // Строимость проживания в бунгало/квартире/доме/дворце
  var PRICES = [0, 1000, 5000, 10000];
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var formElements = [
    '.ad-form fieldset',
    '.map__filters select',
    '.map__filters fieldset'
  ];
  var form = document.querySelector('.ad-form');
  var mapPinMain = window.util.getSelector('.map__pin--main');
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
  setDisableToggle(formElements, 'add');
  var activateForm = function () {
    setDisableToggle(formElements, 'remove');
    form.classList.remove('ad-form--disabled');
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.mapFlag === false) {
      activateForm();
      window.backend.load(window.data.successHandler, window.data.errorHandler);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activateForm();
      window.backend.load(window.data.successHandler, window.data.errorHandler);
    }
  });

  // Установка координат в поле адрес
  window.util.getSelector('#address').value = window.map.setCoordinates(
      window.map.PIN_SIZE / 2,
      window.map.PIN_SIZE / 2);


  // Функция установки минимального значения для поля цена
  var price = window.util.getSelector('#price');
  var setPrice = function (index) {
    price.setAttribute('min', PRICES[index]);
    price.setAttribute('placeholder', PRICES[index]);
  };
  var type = window.util.getSelector('#type');
  setPrice(type.options.selectedIndex);
  type.addEventListener('change', function () {
    setPrice(type.options.selectedIndex);
  });
  var timeIn = window.util.getSelector('#timein');
  var timeOut = window.util.getSelector('#timeout');
  // Синхронизация заезда - выезда
  timeIn.addEventListener('change', function () {
    timeOut.options.selectedIndex = timeIn.options.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.options.selectedIndex = timeOut.options.selectedIndex;
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
  var roomNumber = window.util.getSelector('#room_number');
  roomNumber.addEventListener('change', function () {
    setGuests(roomNumber.value);
  });

  setGuests(roomNumber.value);
  // Сброс состояния приложения
  var resetHandler = function () {
    form.reset();
    window.util.getSelector('.map__filters').reset();
    // Удаляем все пины и карточки с карты
    window.pin.addRemovePins();
    // Возвращаем карту в исходное состояние
    window.util.getSelector('.map').classList.add('map--faded');
    mapPinMain.style.left = window.map.defaultPinCoordinates.left;
    mapPinMain.style.top = window.map.defaultPinCoordinates.top;
    window.mapFlag = false;

    // Установка координат в поле адрес
    window.util.getSelector('#address').value = window.map.setCoordinates(
        window.map.PIN_SIZE / 2,
        window.map.PIN_SIZE / 2);
    // Включаем оверлей формы
    form.classList.add('ad-form--disabled');
    // Отключаем элементы формы
    setDisableToggle(formElements, 'add');
  };

  // Управляемый сброс формы объявления
  window.util.getSelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    resetHandler();
  });

  // Передача данных формы в AJAX для загрузки на сервер
  // Слушатель отправки формы
  form.addEventListener('submit', function (evt) {
    var main = window.util.getSelector('main');
    // Обработка ошибок формы
    var errorHandler = function () {
      var fragment = document.createDocumentFragment();
      var succesTemplate = window.util.getSelector('#error').content;
      fragment.appendChild(succesTemplate.cloneNode(true));
      main.appendChild(fragment);
      var error = window.util.getSelector('.error');
      var keyCloseErrorHandler = function (eventError) {
        if (eventError.type === 'keydown' && eventError.key === ESC_KEY) {
          if (error) {
            error.remove();
          }
          document.removeEventListener('keydown', keyCloseErrorHandler);
        }
      };
      var clickCloseErrorHandler = function () {
        if (error) {
          error.remove();
        }
        document.removeEventListener('click', clickCloseErrorHandler);
      };
      error.addEventListener('click', clickCloseErrorHandler);
      document.addEventListener('keydown', keyCloseErrorHandler);
    };
    // Обработка успешной отправки формы
    var successHandler = function () {
      resetHandler();
      var fragment = document.createDocumentFragment();
      var succesTemplate = window.util.getSelector('#success').content;
      fragment.appendChild(succesTemplate.cloneNode(true));
      main.appendChild(fragment);
      var success = window.util.getSelector('.success');
      var keyCloseHandler = function (eventClose) {
        if (eventClose.type === 'keydown' && eventClose.key === ESC_KEY) {
          success.remove();
          document.removeEventListener('keydown', keyCloseHandler);
        }
      };
      var clickCloseHandler = function () {
        success.remove();
        document.removeEventListener('click', clickCloseHandler);
      };
      success.addEventListener('click', clickCloseHandler);
      document.addEventListener('keydown', keyCloseHandler);
    };
    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });
})();
