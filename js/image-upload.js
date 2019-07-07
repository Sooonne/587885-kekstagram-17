'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload');
  var popupEdit = imgUpload.querySelector('.img-upload__overlay');
  var commentTextarea = popupEdit.querySelector('textarea[name="description"]');
  var uploadFile = imgUpload.querySelector('#upload-file');
  var uploadCancel = imgUpload.querySelector('#upload-cancel');

  var onPopupEditKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      // to prevent macOS close full screen
      evt.preventDefault();
      if (document.activeElement !== commentTextarea) {
        closePopupEdit();
      }
    }
  };

  commentTextarea.addEventListener('invalid', function () {
    if (commentTextarea.validity.tooLong) {
      commentTextarea.setCustomValidity('Комментарий не должен быть длиннее 140 символов');
    }
  });

  var onUploadFileChange = function () {
    popupEdit.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEditKeydown);
    window.imageEditor.currentEffect = popupEdit.querySelector('input[name="effect"]:checked').value;
    window.imageEditor.resetStyle();
    window.imageEditor.setEffectsDepth();
  };

  var closePopupEdit = function () {
    popupEdit.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', onPopupEditKeydown);
  };

  uploadFile.addEventListener('change', onUploadFileChange);
  uploadCancel.addEventListener('click', function () {
    closePopupEdit();
  });
})();

