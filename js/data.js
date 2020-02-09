'use strict';
(function () {
  var mocks = [];
  var MOCK_COUNT = 8; // Число генерируемых случайных предложений
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
  var NOT_FOR_GUESTS = 100;

  // Строимость проживания в бунгало/квартире/доме/дворце
  var PRICES = [0, 1000, 5000, 10000];
  var DESCRIPTION = 'Описание предложения';
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var ADDRESS = 600;
  var PRICE = 1000;
  var ROOMS = 6; // Максимальное количество комнат
  var GUESTS = 12; // Максимальное количество гостей

  // Генератор случайных предложений
  var mockOfferCreator = function (i) {
    var mockOffer = {};
    mockOffer.author = {
      avatar: 'img/avatars/user0' + i + '.png'
    };
    mockOffer.offer = {
      title: TITLES[window.util.getRandom(0, TYPES.length - 1)],
      address: window.util.getRandom(0, ADDRESS) + ', ' + window.util.getRandom(0, ADDRESS),
      price: window.util.getRandom(0, PRICE),
      type: TYPES[window.util.getRandom(0, TYPES.length - 1)],
      rooms: window.util.getRandom(0, ROOMS),
      guests: window.util.getRandom(0, GUESTS),
      checkin: CHECKINS[window.util.getRandom(0, CHECKINS.length - 1)],
      checkout: CHECKOUTS[window.util.getRandom(0, CHECKOUTS.length - 1)],
      features: FEATURES.slice(window.util.getRandom(0, FEATURES.length - 1)),
      description: DESCRIPTION,
      photos: PHOTOS.slice(window.util.getRandom(0, PHOTOS.length - 1)),
      location: {
        x: window.util.getRandom(0, window.map.X_MAX),
        y: window.util.getRandom(window.map.Y_MIN, window.map.Y_MAX)
      }
    };
    return mockOffer;
  };

  // Функция - генератор заданного числа случайных предложений
  var mockOffersGenerator = function (count) {
    for (var i = 1; i <= count; i++) {
      mocks.push(mockOfferCreator(i));
    }
  };
    // Генерируем мокап данные
  mockOffersGenerator(MOCK_COUNT);

  window.data = {
    NOT_FOR_GUESTS: NOT_FOR_GUESTS,
    PRICE: PRICE,
    PRICES: PRICES,
    mocks: mocks
  };
})();
