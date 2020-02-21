'use strict';
(function () {
  // Количество пинов на карте
  var PIN_LIMIT = 5;

  // Функция добавления пинов на карту
  var addPinToMap = function (data, num) {
    var fragment = document.createDocumentFragment();
    var pinTemplate = window.util.getSelector('#pin').content;
    var pinForAdd = pinTemplate.cloneNode(true);
    var pinImg = pinForAdd.querySelector('img');
    var pinButton = pinForAdd.querySelector('.map__pin');
    // Добавляем слушателя на показ карточки через замыкание функции
    pinButton.addEventListener('click', function () {
      window.card.cardShow(num);
      var pinButtons = document.querySelectorAll('.map__pin');
      for (var i = 0; i < pinButtons.length; i++) {
        if (pinButtons[i].classList.contains('map__pin--active')) {
          pinButtons[i].classList.remove('map__pin--active');
        }
        pinButton.classList.add('map__pin--active');
      }
    });
    pinButton.style = 'left: ' + (data.location.x + window.map.MAP_PIN_SIZE / 2) + 'px; top: ' + (data.location.y + window.map.MAP_PIN_HEIGHT) + 'px';
    pinImg.src = data.author.avatar;
    pinImg.alt = data.offer.title;
    fragment.appendChild(pinForAdd);
    // Добавляем пины на карту
    window.util.getSelector('.map__pins').appendChild(fragment);
  };

  var addRemovePins = function (data) {
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
      addPinToMap(data[k], k);
      window.card.addCardToMap(data[k], k);
    }
  };
  window.pin = {
    addPinToMap: addPinToMap,
    addRemovePins: addRemovePins
  };

})();

// Drag-and-Drop метки на карте

(function () {
  var pinHandler = window.util.getSelector('.map__pin--main');

  pinHandler.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };


      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';

      if (parseInt(pinHandler.style.top, 10) > window.map.Y_MAX) {
        pinHandler.style.top = window.map.Y_MAX + 'px';
      } else if (parseInt(pinHandler.style.top, 10) < window.map.Y_MIN) {
        pinHandler.style.top = window.map.Y_MIN + 'px';
      }

      if ((parseInt(pinHandler.style.left, 10) + window.map.MAP_PIN_SIZE / 2) >= window.map.X_MAX) {
        pinHandler.style.left = (window.map.X_MAX - window.map.MAP_PIN_SIZE / 2) + 'px';
      } else if ((parseInt(pinHandler.style.left, 10) + window.map.MAP_PIN_SIZE / 2) <= 0) {
        pinHandler.style.left = 0 - window.map.MAP_PIN_SIZE / 2 + 'px';
      }
    };

    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.util.getSelector('#address').value = window.map.setCoordinates(
          window.map.MAP_PIN_SIZE / 2,
          window.map.MAP_PIN_HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

