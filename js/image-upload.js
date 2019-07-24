'use strict';

(function () {

  var uploadFile = window.imageUploadCommon.uploadFile;
  var uploadCancel = window.imageUploadCommon.imgUpload.querySelector('#upload-cancel');

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
