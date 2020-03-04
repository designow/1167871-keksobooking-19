'use strict';
// Drag-and-Drop метки на карте
(function () {
  var pinHandler = window.util.getSelector('.map__pin--main');
  var PinSizeCorrection = window.map.PIN_SIZE / 2;

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

      var pinTop = parseInt(pinHandler.style.top, 10);

      if (pinTop > window.map.Y_MAX) {
        pinHandler.style.top = window.map.Y_MAX + 'px';
      } else if (pinTop < window.map.Y_MIN) {
        pinHandler.style.top = window.map.Y_MIN + 'px';
      }

      var pinLeft = parseInt(pinHandler.style.left, 10) + PinSizeCorrection;
      if (pinLeft >= window.map.X_MAX) {
        pinHandler.style.left = (window.map.X_MAX - PinSizeCorrection) + 'px';
      } else if (pinLeft <= 0) {
        pinHandler.style.left = 0 - PinSizeCorrection + 'px';
      }
    };

    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.util.getSelector('#address').value = window.map.setCoordinates(
          PinSizeCorrection,
          window.map.PIN_HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
