'use strict';
(function () {
// Функция добавления пинов на карту
  var addToMap = function () {
    var fragment = document.createDocumentFragment();
    var pinTemplate = window.util.getSelector('#pin').content;
    for (var i = 0; i < window.data.mocks.length; i++) {
      var pinForAdd = pinTemplate.cloneNode(true);
      var pinImg = pinForAdd.querySelector('img');
      var pinButton = pinForAdd.querySelector('.map__pin');
      pinButton.style = 'left: ' + (window.data.mocks[i].offer.location.x + window.map.MAP_PIN_SIZE/2) + 'px; top: ' + (window.data.mocks[i].offer.location.y + window.map.MAP_PIN_HEIGHT) + 'px';
      pinImg.src = window.data.mocks[i].author.avatar;
      pinImg.alt = window.data.mocks[i].offer.title;
      fragment.appendChild(pinForAdd);
    }
    // Добавляем пины на карту
    window.util.getSelector('.map__pins').appendChild(fragment);
  };

  // Выводим предложения на карту
  addToMap();
})();
