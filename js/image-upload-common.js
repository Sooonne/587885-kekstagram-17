'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload');
  var popupEdit = imgUpload.querySelector('.img-upload__overlay');
  var commentTextarea = popupEdit.querySelector('textarea[name="description"]');
  var hashtagForm = imgUpload.querySelector('input[name="hashtags"]');
  var uploadFile = imgUpload.querySelector('#upload-file');

  window.imageUploadCommon = {
    imgUpload: imgUpload,
    popupEdit: popupEdit,
    commentTextarea: commentTextarea,
    hashtagForm: hashtagForm,
    uploadFile: uploadFile,
  };
})();
