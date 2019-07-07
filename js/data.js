'use strict';

(function () {

  var COMMENT_OPTIONS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var PHOTO_NUMBER = 25;
  var NAME_OPTIONS = ['Артем', 'Виктор', 'Вильям', 'Анна', 'Джессика', 'Бог Кекс'];
  var MIN_COMMENTS = 0;
  var MAX_COMMENTS = 50;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var AVATARS_COUNT = 6;

  var getCommentText = function (array) {
    var message = window.util.getRandomOfArray(array);
    if (Math.round(Math.random()) === 1) {
      message += ' ' + window.util.getRandomOfArray(array);
    }
    return message;
  };

  var generateComents = function (count) {
    var comments = [];
    for (var i = 0; i < count; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.util.getRandomOfArray(window.util.generateNaturalSequence(AVATARS_COUNT)) + '.svg',
        message: getCommentText(COMMENT_OPTIONS),
        name: window.util.getRandomOfArray(NAME_OPTIONS)
      };
    }
    return comments;
  };

  var generatePhotos = function (count) {
    var photos = [];
    var shuffledNumbers = window.util.shuffleArray(window.util.generateNaturalSequence(count));
    for (var i = 0; i < count; i++) {
      photos[i] = {
        url: 'photos/' + shuffledNumbers[i] + '.jpg',
        likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: generateComents(window.util.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
      };
    }
    return photos;
  };

  window.photoData = generatePhotos(PHOTO_NUMBER);
  // if need more use object
})();

