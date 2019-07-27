'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgUpload = window.imageUploadCommon.imgUpload;
  var uploadFile = window.imageUploadCommon.uploadFile;
  var uploadCancel = window.imageUploadCommon.imgUpload.querySelector('#upload-cancel');
  var preview = imgUpload.querySelector('.img-upload__preview img');

  var onPopupEditKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.preventDefault();
      if (document.activeElement !== window.imageUploadCommon.commentTextarea && document.activeElement !== window.imageUploadCommon.hashtagForm) {
        window.closePopupEdit();
      }
    }
  };

  var onUploadFileChange = function () {
    window.imageUploadCommon.popupEdit.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEditKeydown);
    window.imageEditor.currentEffect = window.imageUploadCommon.popupEdit.querySelector('input[name="effect"]:checked').value;
    window.imageEditor.resetStyle();
    window.imageEditor.setEffectsDepth();

    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.closePopupEdit = function () {
    window.imageUploadCommon.popupEdit.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', onPopupEditKeydown);
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  uploadCancel.addEventListener('click', function () {
    window.closePopupEdit();
  });

})();
