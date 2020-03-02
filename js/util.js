'use strict';
(function () {
  // Функция выбора элемента
  var getSelector = function (selector) {
    return document.querySelector(selector);
  };

  // Функция рэндомайзер
  var getRandom = function (min, max) {
    max -= min;
    return Math.round(Math.random() * max) + min;
  };

  window.util = {
    getSelector: getSelector,
    getRandom: getRandom,
  };
})();
