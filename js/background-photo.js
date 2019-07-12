'use strict';

(function () {

  var generatePhotoNodes = function (photoData) {
    var photoElements = [];
    var similarPhotoTemplate = document.querySelector('#picture').content;
    for (var i = 0; i < photoData.length; i++) {
      photoElements[i] = similarPhotoTemplate.cloneNode(true);
      photoElements[i].querySelector('.picture__img').src = photoData[i].url;
      photoElements[i].querySelector('.picture__likes').textContent = photoData[i].likes;
      photoElements[i].querySelector('.picture__comments').textContent = photoData[i].comments.length;
    }
    return photoElements;
  };

  var renderPhotos = function (photos) {
    var similarPhotoElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var photoNodes = generatePhotoNodes(photos);
    for (var i = 0; i < photoNodes.length; i++) {
      fragment.appendChild(photoNodes[i]);
    }
    similarPhotoElement.appendChild(fragment);
  };

  var onDataLoad = function (photos) {
    renderPhotos(photos);
  };

  var onDataError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onDataLoad, onDataError);

})();
