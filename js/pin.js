'use strict';
(function () {
// Функция добавления пинов на карту
  var addPinToMap = function (data, num) {
    var fragment = document.createDocumentFragment();
    var pinTemplate = window.util.getSelector('#pin').content;
    var pinForAdd = pinTemplate.cloneNode(true);
    var pinImg = pinForAdd.querySelector('img');
    var pinButton = pinForAdd.querySelector('.map__pin');
    // Показываем карточку через замыкания функции
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

  window.pin = {
    addPinToMap: addPinToMap,
  };
})();
