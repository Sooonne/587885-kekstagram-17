'use strict';

(function () {

  var form = window.imageUploadCommon.imgUpload.querySelector('.img-upload__form');
  var main = document.querySelector('main');
  var commentTextarea = window.imageUploadCommon.commentTextarea;
  var hashtagForm = window.imageUploadCommon.hashtagForm;

  commentTextarea.addEventListener('invalid', function () {
    if (commentTextarea.validity.tooLong) {
      commentTextarea.setCustomValidity('Комментарий не должен быть длиннее 140 символов');
    }
  });

  hashtagForm.addEventListener('blur', function () {
    hashtagForm.style.border = '';
    form.disabled = false;
    hashtagForm.setCustomValidity('');

    var hashtags = hashtagForm.value.toLowerCase().split(/ +/);
    if (hashtags.length > window.util.MAX_HASHTAG_NUMBER) {
      hashtagForm.setCustomValidity('Используйте не более 5 хэш-тегов');
      hashtagForm.style.borderColor = 'rgb(255, 0, 0, 1)';
      form.disabled = true;
    }
    hashtags.forEach(function (it) {
      if (it[0] !== '#') {
        hashtagForm.setCustomValidity('Каждый хэш-тег должен начинаться с символа "#"');
        hashtagForm.style.borderColor = 'rgb(255, 0, 0, 1)';
        form.disabled = true;
      }
    });

    var uniqueHashtags = hashtags.filter(window.util.isFirstAppearance);
    if (hashtags.length > uniqueHashtags.length) {
      hashtagForm.setCustomValidity('Не должно быть одинаковых хэш-тегов');
      hashtagForm.style.borderColor = 'rgb(255, 0, 0, 1)';
      form.disabled = true;
    }

    hashtags.forEach(function (it) {
      if (it.length > window.util.MAX_HASHTAG_LENGTH) {
        hashtagForm.setCustomValidity('Хэш-тег не должен быть длиннее 20 символов');
        hashtagForm.style.borderColor = 'rgb(255, 0, 0, 1)';
        form.disabled = true;
      }
    });

    hashtags.forEach(function (it) {
      if (it === '#') {
        hashtagForm.setCustomValidity('Хэш-тег не может состоять только из #');
        hashtagForm.style.borderColor = 'rgb(255, 0, 0, 1)';
        form.disabled = true;
      }
    });
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onDataSave, onSaveError);

    window.imageUploadCommon.uploadFile.value = null;
    hashtagForm.value = null;
    commentTextarea.value = null;
    window.imageEditor.resetStyle();
    window.imageEditor.currentEffect = 'heat';
    window.imageUploadCommon.popupEdit.querySelector('#effect-heat').checked = true;
  });

  var onDataSave = function () {
    var messageSuccess = document.querySelector('#success').content;
    main.appendChild(messageSuccess);
    window.closePopupEdit();

    messageSuccess = main.querySelector('.success');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        evt.preventDefault();
        messageSuccess.remove();
      }
    });

    document.addEventListener('click', function () {
      messageSuccess.remove();
    });
  };

  var onSaveError = function () {
    var messageError = document.querySelector('#error').content;
    main.appendChild(messageError);
    window.closePopupEdit();

    messageError = main.querySelector('.error');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        evt.preventDefault();
        messageError.remove();
      }
    });

    document.addEventListener('click', function () {
      messageError.remove();
    });
  };

})();
