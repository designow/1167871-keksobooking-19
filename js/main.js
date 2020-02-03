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

var FORM_ELEMENTS = [
  '.ad-form fieldset',
  '.ad-form input',
  '.ad-form select',
  '.ad-form button',
  '.map__filters select',
  '.map__filters fieldset'
];

// Строимость проживания в бунгало/квартире/доме/дворце
var PRICES = [0, 1000, 5000, 10000];

var X_MAX = 1100;
var Y_MIN = 130;
var Y_MAX = 630;
var MAP_PIN_HEIGHT = 85;
var MAP_PIN_SIZE = 65;
var NOT_FOR_GUESTS = 100;

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
var mockOfferCreator = function (i) {
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
var mockOffersGenerator = function (count) {
  for (var i = 1; i <= count; i++) {
    mocks.push(mockOfferCreator(i));
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
    pinButton.style = 'left: ' + (mocks[i].offer.location.x + MAP_PIN_SIZE/2) + 'px; top: ' + (mocks[i].offer.location.y + MAP_PIN_HEIGHT) + 'px';
    pinImg.src = mocks[i].author.avatar;
    pinImg.alt = mocks[i].offer.title;
    fragment.appendChild(pinForAdd);
  }
  // Добавляем пины на карту
  getSelector('.map__pins').appendChild(fragment);
};

// // Генерируем мокап данные
// mockOffersGenerator(MOCK_COUNT);
// // Выводим предложения на карту
// addToMap();

// Функция отключения/включения элементов формы
var setDisableToggle = function (data, toggle) {
  for (var i = 0; i < data.length; i++) {
    var selectors = document.querySelectorAll(data[i]);
    for (var j = 0; j < selectors.length; j++) {
      if (toggle === 'add') {
        selectors[j].setAttribute('disabled', 'disabled');
      } else {
        selectors[j].removeAttribute('disabled');
      }
    }
  }
};
// Отключаем элементы форм
setDisableToggle(FORM_ELEMENTS, 'add');

var activateForm = function () {
  setDisableToggle(FORM_ELEMENTS, 'remove');
  getSelector('.map').classList.remove('map--faded');
  getSelector('.ad-form').classList.remove('ad-form--disabled');
  setCoordinates(getSelector('.map__pin--main').style.left, getSelector('.map__pin--main').style.top,  MAP_PIN_SIZE/2, MAP_PIN_HEIGHT);
};

getSelector('.map__pin--main').addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateForm();
  }
});

getSelector('.map__pin--main').addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateForm();
  }
});

// Вносим координаты метки в поле адрес
var setCoordinates = function (x, y, xCorrection, yCorrection) {
  x = parseInt(x, 10);
  y = parseInt(y, 10);
  if (xCorrection > 0) x += xCorrection;
  if (yCorrection > 0) y += yCorrection;
  getSelector('#address').value = Math.round(x) + ', ' + Math.round(y);
};

setCoordinates(getSelector('.map__pin--main').style.left, getSelector('.map__pin--main').style.top, MAP_PIN_SIZE/2, MAP_PIN_SIZE/2);

// Функция установки минимального значения для поля цена
var setPrice = function (index) {
  getSelector('#price').setAttribute('min', PRICES[index]);
  getSelector('#price').setAttribute('placeholder', PRICES[index]);
};

setPrice(getSelector('#type').options.selectedIndex);
getSelector('#type').addEventListener('change', function () {
  setPrice(getSelector('#type').options.selectedIndex);
});

// Синхронизация заезда - выезда
getSelector('#timein').addEventListener('change', function () {
  getSelector('#timeout').options.selectedIndex = getSelector('#timein').options.selectedIndex;
});

getSelector('#timeout').addEventListener('change', function () {
  getSelector('#timein').options.selectedIndex = getSelector('#timeout').options.selectedIndex;
});

// Управление числом гостей
var setGuests = function (rooms) {
  var capacity = document.querySelectorAll('#capacity option');
  rooms = (parseInt(rooms, 10) === NOT_FOR_GUESTS) ? rooms = 0 : rooms = parseInt(rooms, 10);
  for (var i = 0; i < capacity.length; i++) {

    var currentItem = parseInt(capacity[i].value, 10);

    capacity[i].removeAttribute('disabled');
    capacity[i].removeAttribute('selected');

    if (currentItem > rooms || currentItem === 0) {
      capacity[i].setAttribute('disabled', 'disabled');
    }

    if (currentItem === rooms) {
      capacity[i].removeAttribute('disabled');
      capacity[i].setAttribute('selected', 'selected');
    }
  }
};

getSelector('#room_number').addEventListener('change', function () {
  setGuests(getSelector('#room_number').value);
});

setGuests(getSelector('#room_number').value);
