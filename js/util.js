'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_NUMBER = 5;

  window.util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateNaturalSequence: function (count) {
      var array = [];
      for (var i = 0; i < count; i++) {
        array.push(i + 1);
      }
      return array;
    },

    shuffleArray: function (array) {
      var temp;
      var j;
      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    },

    getRandomOfArray: function (array) {
      var rand = Math.floor(Math.random() * array.length);
      return array[rand];
    },

    ESC_KEYCODE: ESC_KEYCODE,
    MAX_HASHTAG_LENGTH: MAX_HASHTAG_LENGTH,
    MAX_HASHTAG_NUMBER: MAX_HASHTAG_NUMBER,

    isFirstAppearance: function (value, index, self) {
      return self.indexOf(value) === index;
    },
  };
})();

