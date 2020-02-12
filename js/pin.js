'use strict';
(function () {
// Функция добавления пинов на карту
  var addPinToMap = function (data) {
    var fragment = document.createDocumentFragment();
    var pinTemplate = window.util.getSelector('#pin').content;
    var pinForAdd = pinTemplate.cloneNode(true);
    var pinImg = pinForAdd.querySelector('img');
    var pinButton = pinForAdd.querySelector('.map__pin');
    pinButton.style = 'left: ' + (data.location.x + window.map.MAP_PIN_SIZE / 2) + 'px; top: ' + (data.location.y + window.map.MAP_PIN_HEIGHT) + 'px';
    pinImg.src = data.author.avatar;
    pinImg.alt = data.offer.title;
    fragment.appendChild(pinForAdd);
    // Добавляем пины на карту
    window.util.getSelector('.map__pins').appendChild(fragment);
  };

  window.pin = {
    addPinToMap: addPinToMap,
  };
})();
