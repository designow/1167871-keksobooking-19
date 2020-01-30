'use strict';

var offersData = [];
var MOKI_COUNT = 8;
var ADDRESS_CONST = 600;
var PRICE_CONST = 1000;
var ROOMS_CONST = 6;
var GUESTS_CONST = 12;
var TITLE_DATA = ['Чудесная комната', 'Аренда дома', 'Сдам комнату', 'Хостел', 'Апартаменты', 'Квартира посуточно', 'Апарт - отель', 'Резиденция'];
var TYPE_DATA = ['place', 'flat', 'house', 'bungalo'];
var CHECKIN_DATA = ['12:00', '13:00', '14:00'];
var CHECKOUT_DATA = ['12:00', '13:00', '14:00'];
var FEATURES_DATA = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION_CONST = 'Описание предложения';
var PHOTOS_DATA = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X_MAX_CONST = 1100;
var Y_MIN_CONST = 130;
var Y_MAX_CONST = 630;

// Функция выбора элемента
var qs = function (selector) {
  return document.querySelector(selector);
};

// Функция рэндомайзер
var randomizer = function (min, max) {
  max -= min;
  return Math.round(Math.random() * max) + min;
};

// Генератор случайных предложений
var mokiOfferCreator = function (i) {
  var mokiOffer = {};
  mokiOffer.author = {
    avatar: 'img/avatars/user/0' + i + '.png'
  };
  mokiOffer.offer = {
    title: TITLE_DATA[randomizer(0, TYPE_DATA.length - 1)],
    address: randomizer(0, ADDRESS_CONST) + ', ' + randomizer(0, ADDRESS_CONST),
    price: randomizer(0, PRICE_CONST),
    type: TYPE_DATA[randomizer(0, TYPE_DATA.length - 1)],
    rooms: randomizer(0, ROOMS_CONST),
    guests: randomizer(0, GUESTS_CONST),
    checkin: CHECKIN_DATA[randomizer(0, CHECKIN_DATA.length - 1)],
    checkout: CHECKOUT_DATA[randomizer(0, CHECKOUT_DATA.length - 1)],
    features: FEATURES_DATA.slice(randomizer(0, FEATURES_DATA.length - 1)),
    description: DESCRIPTION_CONST,
    photos: PHOTOS_DATA.slice(randomizer(0, PHOTOS_DATA.length - 1)),
    location: {
      x: randomizer(0, X_MAX_CONST),
      y: randomizer(Y_MIN_CONST, Y_MAX_CONST)
    }
  };
  return mokiOffer;
};

// Функция - генератор заданного числа случайных предложений
var mokiOffersGenerator = function (count) {
  for (var i = 1; i <= count; i++) {
    offersData.push(mokiOfferCreator(i));
  }
};

// Функция добавления пинов на карту
var addToMap = function (fragment) {
  var pinTemplate = qs('#pin');
  pinTemplate = pinTemplate.content;
  for (var i = 0; i < offersData.length; i++) {
    var pinForAdd = pinTemplate.cloneNode(true);
    var pinImg = pinForAdd.querySelector('img');
    var pinButton = pinForAdd.querySelector('.map__pin');
    pinButton.style = 'left: ' + (offersData[i].offer.location.x - 31) + 'px; top: ' + (offersData[i].offer.location.y - 85) + 'px';
    pinImg.src = offersData[i].author.avatar;
    pinImg.alt = offersData[i].offer.title;
    fragment.appendChild(pinForAdd);
  }
  // Добавляем пины на карту
  qs('.map__pins').appendChild(fragment);
};

// Включаем карту
qs('.map').classList.remove('map--faded');
var fragment = document.createDocumentFragment();

// Генерируем мокап данные
mokiOffersGenerator(MOKI_COUNT);
// Выводим предложения на карту
addToMap(fragment);
