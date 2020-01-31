'use strict';

var mocks = [];
var MOCK_COUNT = 8;
var ADDRESS = 600;
var PRICE = 1000;
var ROOMS = 6;
var GUESTS = 12;
var TITLES = [
  'Чудесная комната',
  'Аренда дома',
  'Сдам комнату',
  'Хостел',
  'Апартаменты',
  'Квартира посуточно',
  'Апарт - отель',
  'Резиденция'
];
var TYPES = [
  'place',
  'flat',
  'house',
  'bungalo'
];
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var DESCRIPTION = 'Описание предложения';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var X_MAX = 1100;
var Y_MIN = 130;
var Y_MAX = 630;
var X_CORRECTION = 31;
var Y_CORRECTION = 85;

// Функция выбора элемента
var getSelector = function (selector) {
  return document.querySelector(selector);
};

// Функция рэндомайзер
var getRandom = function (min, max) {
  max -= min;
  return Math.round(Math.random() * max) + min;
};

// Генератор случайных предложений
var mokiOfferCreator = function (i) {
  var mokiOffer = {};
  mokiOffer.author = {
    avatar: 'img/avatars/user0' + i + '.png'
  };
  mokiOffer.offer = {
    title: TITLES[getRandom(0, TYPES.length - 1)],
    address: getRandom(0, ADDRESS) + ', ' + getRandom(0, ADDRESS),
    price: getRandom(0, PRICE),
    type: TYPES[getRandom(0, TYPES.length - 1)],
    rooms: getRandom(0, ROOMS),
    guests: getRandom(0, GUESTS),
    checkin: CHECKINS[getRandom(0, CHECKINS.length - 1)],
    checkout: CHECKOUTS[getRandom(0, CHECKOUTS.length - 1)],
    features: FEATURES.slice(getRandom(0, FEATURES.length - 1)),
    description: DESCRIPTION,
    photos: PHOTOS.slice(getRandom(0, PHOTOS.length - 1)),
    location: {
      x: getRandom(0, X_MAX),
      y: getRandom(Y_MIN, Y_MAX)
    }
  };
  return mokiOffer;
};

// Функция - генератор заданного числа случайных предложений
var mokiOffersGenerator = function (count) {
  for (var i = 1; i <= count; i++) {
    mocks.push(mokiOfferCreator(i));
  }
};

// Функция добавления пинов на карту
var addToMap = function () {
  var fragment = document.createDocumentFragment();
  var pinTemplate = getSelector('#pin').content;
  for (var i = 0; i < mocks.length; i++) {
    var pinForAdd = pinTemplate.cloneNode(true);
    var pinImg = pinForAdd.querySelector('img');
    var pinButton = pinForAdd.querySelector('.map__pin');
    pinButton.style = 'left: ' + (mocks[i].offer.location.x - X_CORRECTION) + 'px; top: ' + (mocks[i].offer.location.y - Y_CORRECTION) + 'px';
    pinImg.src = mocks[i].author.avatar;
    pinImg.alt = mocks[i].offer.title;
    fragment.appendChild(pinForAdd);
  }
  // Добавляем пины на карту
  getSelector('.map__pins').appendChild(fragment);
};

// Включаем карту
getSelector('.map').classList.remove('map--faded');

// Генерируем мокап данные
mokiOffersGenerator(MOCK_COUNT);
// Выводим предложения на карту
addToMap();
