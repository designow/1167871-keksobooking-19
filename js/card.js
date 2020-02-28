'use strict';
(function () {
// Функция добавления карточки предложения на карту
  var addCardToMap = function (data, num) {
    var TYPE_OF_HOUSE_CARD = {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };
    var cardFragment = document.createDocumentFragment();
    var cardTemplate = window.util.getSelector('#card').content;
    var cardForAdd = cardTemplate.cloneNode(true);
    cardForAdd.querySelector('.map__card').classList.add('hidden');
    cardForAdd.querySelector('.map__card').setAttribute('id', 'offerCard-' + num);
    cardForAdd.querySelector('.popup__title').textContent = data.offer.title;
    cardForAdd.querySelector('.popup__text--address').textContent = data.offer.address;
    cardForAdd.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardForAdd.querySelector('.popup__type').textContent = TYPE_OF_HOUSE_CARD[data.offer.type];
    cardForAdd.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardForAdd.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    // Удаляем всех потомков у features
    var cardFeatures = cardForAdd.querySelector('.popup__features');
    while (cardFeatures.firstChild) {
      cardFeatures.removeChild(cardFeatures.firstChild);
    }
    for (var i = 0; i < data.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + data.offer.features[i]);
      cardFeatures.appendChild(feature);
    }
    cardForAdd.querySelector('.popup__description').textContent = data.offer.description;
    var photoTemplate = cardForAdd.querySelector('.popup__photos img');
    cardForAdd.querySelector('.popup__photos').removeChild(photoTemplate);
    for (i = 0; i < data.offer.photos.length; i++) {
      var photoForAdd = photoTemplate.cloneNode(true);
      photoForAdd.src = data.offer.photos[i];
      cardForAdd.querySelector('.popup__photos').appendChild(photoForAdd);
    }
    cardForAdd.querySelector('.popup__avatar').src = data.author.avatar;
    cardFragment.appendChild(cardForAdd);
    // Добавляем карточку на карту
    window.util.getSelector('.map').insertBefore(cardFragment, window.util.getSelector('.map__filters-container'));
  };
  var cardShow = function (num) {
    var cards = document.querySelectorAll('.map__card');
    var ESC_KEY = 'Escape';
    for (var i = 0; i < cards.length; i++) {
      if (!cards[i].classList.contains('hidden')) {
        cards[i].classList.add('hidden');
      }
    }
    var currentCard = window.util.getSelector('#offerCard-' + num);
    var closeHandler = function (evt) {
      if (evt.type === 'keydown' && evt.key === ESC_KEY || evt.type === 'click') {
        currentCard.classList.add('hidden');
      }
    };
    currentCard.classList.remove('hidden');
    currentCard.querySelector('.popup__close').addEventListener('click', closeHandler);
    document.addEventListener('keydown', closeHandler);
  };
  window.card = {
    addCardToMap: addCardToMap,
    cardShow: cardShow
  };
})();
