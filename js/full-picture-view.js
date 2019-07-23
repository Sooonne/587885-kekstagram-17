'use strict';

(function () {
  var COMMENT_VIEW_COUNT = 5;

  var currentPhoto;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancelButton = document.querySelector('#picture-cancel');
  var commentPage;

  var generateCommentNodes = function (comments) {
    var commentElements = [];
    var similarCommentTemplate = document.querySelector('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      commentElements[i] = similarCommentTemplate.cloneNode(true);
      commentElements[i].querySelector('.social__picture').src = comments[i].avatar;
      commentElements[i].querySelector('.social__text').textContent = comments[i].message;
    }
    return commentElements;
  };

  var renderComments = function (comments, reset) {
    var similarCommentElement = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    var commentNodes = generateCommentNodes(comments);
    for (var i = 0; i < commentNodes.length; i++) {
      fragment.appendChild(commentNodes[i]);
    }
    if (reset) {
      similarCommentElement.innerHTML = '';
    }
    similarCommentElement.appendChild(fragment);
  };

  var onFullPictureKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.preventDefault();
      // close function
      closeFullPicture();
    }
  };

  var closeFullPicture = function () {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    document.removeEventListener('keydown', onFullPictureKeydown);
  };

  pictureCancelButton.addEventListener('click', closeFullPicture);

  window.getOnPhotoClick = function (photo) {
    return function () {
      currentPhoto = photo;
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onFullPictureKeydown);

      bigPicture.querySelector('.big-picture__img img').src = photo.url;
      bigPicture.querySelector('.likes-count').textContent = photo.likes;
      bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

      commentPage = 1;
      renderComments(photo.comments.slice(0, COMMENT_VIEW_COUNT), true);
      commentLoad.addEventListener('click', onLoadCommentsClick);
      bigPicture.querySelector('.social__caption').textContent = photo.description;
    };
  };

  var commentLoad = bigPicture.querySelector('.comments-loader');
  commentLoad.addEventListener('click', onLoadCommentsClick);

  var onLoadCommentsClick = function () {
    renderComments(currentPhoto.comments.slice(COMMENT_VIEW_COUNT * commentPage, COMMENT_VIEW_COUNT + COMMENT_VIEW_COUNT * commentPage));
    if (currentPhoto.comments.length <= COMMENT_VIEW_COUNT + COMMENT_VIEW_COUNT * commentPage) {
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    }
    commentPage += 1;
  };

})();
