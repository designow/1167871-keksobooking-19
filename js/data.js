'use strict';
(function () {
  var NOT_FOR_GUESTS = 100;
  // Строимость проживания в бунгало/квартире/доме/дворце
  var PRICES = [0, 1000, 5000, 10000];
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

  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.pin.addToMap(data[i]);
    }
  };

  window.backend.load(successHandler, errorHandler);
  window.data = {
    NOT_FOR_GUESTS: NOT_FOR_GUESTS,
    PRICES: PRICES
  };
})();
