'USE STRICT';
var mokiData = [];
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
var X_MAX_CONST = 600;
var Y_MIN_CONST = 130;
var Y_MAX_CONST = 630;


// Функция рэндомайзер
var randomizer = function (min, max) {
    max -= min;
    return Math.round(Math.random() * max) + min;
};


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
    }

    return mokiOffer;
}


var mokiOffersGenerator = function (count) {
    for (var i = 1; i <= count; i++) {
        mokiData.push(mokiOfferCreator(i));
    }
}


mokiData.push(mokiOffersGenerator(5));


// {
//     "author": {
//         "avatar": 'img/avatars/user{ { xx } }.png, где { { xx } } это число от 1 до 8 с ведущим нулём.Например, 01, 02 и т.д.Адреса изображений не повторяются
//     },
//     "offer": {
//         "title": строка, заголовок предложения
//         "address": строка, адрес предложения.Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//         "price": число, стоимость
//         "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//         "rooms": число, количество комнат
//         "guests": число, количество гостей, которое можно разместить
//         "checkin": строка с одним из трёх фиксированных значений: 12: 00, 13: 00 или 14: 00,
//             "checkout": строка с одним из трёх фиксированных значений: 12: 00, 13: 00 или 14: 00
//         "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//             "description": строка с описанием,
//                 "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//     },

//     "location": {
//         "x": случайное число, координата x метки на карте.Значение ограничено размерами блока, в котором перетаскивается метка.
//     "y": случайное число, координата y метки на карте от 130 до 630.
//     }
// }