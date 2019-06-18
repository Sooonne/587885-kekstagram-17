'use strict';

var COMMENT_OPTIONS = ['Всё отлично!', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
var PHOTO_NUMBER = 25;
var NAME_OPTIONS = ['Артем', 'Виктор', 'Вильям', 'Анна', 'Джессика', 'Бог Кекс'];

var doOneTwoThree = function (count) {
  var array = []
  for (var i = 0; i < count; i++) {
    array[i] = i + 1;
  }
  return array;
};

var compareRandom = function (a, b) {
  return Math.random() - 0.5;
}

var shuffleArray = function (array) {
  return array.sort(compareRandom);
}

var getRandomOfArray = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var generatePhotos = function (count) {
  var photos = [];
  var shuffledNumbers = shuffleArray(doOneTwoThree(count));
  console.log(shuffledNumbers);
  for (var i = 0; i < count; i++ ) {
    photos[i] = {
      url: 'photos/' + shuffledNumbers[i] + '.jpg',
      likes: Math.round(Math.random() * 185) + 15,
      comments: getRandomOfArray(COMMENT_OPTIONS),
      names: getRandomOfArray(NAME_OPTIONS)
    }
  }
  return photos;
};

var generatePhotoNodes = function (photoData) {
  var photoElements = [];
  var similarPhotoTemplate = document.querySelector('#picture').content;
  for (var i = 0; i < photoData.length; i++) {
    photoElements[i] = similarPhotoTemplate.cloneNode(true);
    photoElements[i].querySelector('.picture__img').src = photoData[i].url;
    photoElements[i].querySelector('.picture__likes').textContent = photoData[i].likes;
    photoElements[i].querySelector('.picture__comments').textContent = photoData[i].comments;
  }
  return photoElements;
}

var renderPhotos = function () {
  var similarPhotoElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photoNodes = generatePhotoNodes(generatePhotos(PHOTO_NUMBER));
  for (var i = 0; i < photoNodes.length; i++) {
    fragment.appendChild(photoNodes[i]);
  }
  similarPhotoElement.appendChild(fragment);
}

renderPhotos();

