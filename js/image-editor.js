'use strict';

(function () {

  var FILTER_OPTIONS = {
    chrome: {
      type: 'grayscale',
      min: 0,
      max: 1,
      suffix: '',
    },
    sepia: {
      type: 'sepia',
      min: 0,
      max: 1,
      suffix: '',
    },
    marvin: {
      type: 'invert',
      min: 0,
      max: 100,
      suffix: '%',
    },
    phobos: {
      type: 'blur',
      min: 0,
      max: 3,
      suffix: 'px',
    },
    heat: {
      type: 'brightness',
      min: 1,
      max: 3,
      suffix: '',
    }
  };
  var MIN_DECREASE_SCALE = 0;
  var MAX_INCREASE_SCALE = 100;
  var SCALE_STEP = 25;

  var buttonDecreaseSize = popupEdit.querySelector('.scale__control--smaller');
  var buttonIncreaseSize = popupEdit.querySelector('.scale__control--bigger');
  var scaleControl = popupEdit.querySelector('.scale__control--value');
  var editingImage = popupEdit.querySelector('.img-upload__preview img');
  var imgUpload = document.querySelector('.img-upload');
  var popupEdit = imgUpload.querySelector('.img-upload__overlay');
  var effectsPin = popupEdit.querySelector('.effect-level__pin');
  var effectsLine = popupEdit.querySelector('.effect-level__line');
  var effect = popupEdit.querySelector('.effects');
  var currentEffect;
  var slideBar = document.querySelector('.img-upload__effect-level');
  var effectsDepth = popupEdit.querySelector('.effect-level__depth');

  var onChangeSizeButtonClick = function (evt) {
    var scaleStepCurrent = evt.target === buttonIncreaseSize ? SCALE_STEP : -SCALE_STEP;
    var scaleCurrentNumber = parseInt(scaleControl.value, 10);
    if ((scaleCurrentNumber + scaleStepCurrent > MIN_DECREASE_SCALE) && (scaleCurrentNumber + scaleStepCurrent <= MAX_INCREASE_SCALE)) {
      scaleCurrentNumber += scaleStepCurrent;
      scaleControl.value = scaleCurrentNumber + '%';
      editingImage.style.transform = 'scale(' + scaleCurrentNumber / 100 + ')';
    }
  };

  buttonDecreaseSize.addEventListener('click', onChangeSizeButtonClick);
  buttonIncreaseSize.addEventListener('click', onChangeSizeButtonClick);

  effect.addEventListener('change', function (evt) {
    window.imageEditor.currentEffect = evt.target.value;
    editingImage.className = ['effects__preview--' + window.imageEditor.currentEffect];
    editingImage.style = {};
    slideBar.classList.remove('hidden');
    if (window.imageEditor.currentEffect === 'none') {
      slideBar.classList.add('hidden');
    }
    window.imageEditor.resetStyle();
  });


  effectsPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPosition = evt.clientX;
    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startPosition - moveEvt.clientX;
      startPosition = moveEvt.clientX;
      effectsPin.style.left = calculatePinPosition(effectsPin.offsetLeft - shift, 0, effectsLine.offsetWidth) + 'px';
      window.imageEditor.setEffectsDepth();
      effectsDepth.style.width = effectsPin.offsetLeft + 'px';
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.imageEditor.setEffectsDepth();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });

  var calculatePinPosition = function (position, min, max) {
    if (position < min) {
      return min;
    } else if (position > max) {
      return max;
    }
    return position;
  };

  window.imageEditor = {
    currentEffect: currentEffect,

    resetStyle: function () {
      scaleControl.value = MAX_INCREASE_SCALE + '%';
      effectsPin.style.left = '100%'; // effectsLine.offsetWidth + 'px'; // можно ставить 100%
      effectsDepth.style.width = '100%';
    },

    setEffectsDepth: function () {
      if (window.imageEditor.currentEffect === 'none') {
        return;
      }
      var effectsLevelLineWidth = effectsLine.offsetWidth; // width parent
      var effectsPinLevel = effectsPin.offsetLeft; // left from parent
      var currentEffectProperties = FILTER_OPTIONS[window.imageEditor.currentEffect];
      var currentProportion = effectsPinLevel / effectsLevelLineWidth;
      var currentEffectLevel = (currentEffectProperties.max - currentEffectProperties.min) * currentProportion + currentEffectProperties.min;
      editingImage.style.filter = currentEffectProperties.type + '(' + currentEffectLevel + currentEffectProperties.suffix + ')';
    },
  };
})();

