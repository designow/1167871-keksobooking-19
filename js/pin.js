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
    pinButton.style = 'left: ' + (data.location.x + window.map.PIN_SIZE / 2) + 'px; top: ' + (data.location.y + window.map.PIN_HEIGHT) + 'px';
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
    if (data) {
      var pinLimit = (data.length > PIN_LIMIT) ? PIN_LIMIT : data.length;
      for (var k = 0; k < pinLimit; k++) {
        addPinToMap(data[k], k);
        window.card.addCardToMap(data[k], k);
      }
    }
  };
  window.pin = {
    addPinToMap: addPinToMap,
    addRemovePins: addRemovePins
  };

})();
