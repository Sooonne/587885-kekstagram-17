'use strict';

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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateNaturalSequence = function (count) {
  var array = [];
  for (var i = 0; i < count; i++) {
    // array[i] = i + 1;
    array.push(i + 1);
  }
  return array;
};

var shuffleArray = function (array) {
  var temp;
  var j;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

var getRandomOfArray = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var getCommentText = function (array) {
  var message = getRandomOfArray(array);
  if (Math.round(Math.random()) === 1) {
    message += ' ' + getRandomOfArray(array);
  }
  return message;
};

var generateComents = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomOfArray(generateNaturalSequence(AVATARS_COUNT)) + '.svg',
      message: getCommentText(COMMENT_OPTIONS),
      name: getRandomOfArray(NAME_OPTIONS)
    };
  }
  return comments;
};

var generatePhotos = function (count) {
  var photos = [];
  var shuffledNumbers = shuffleArray(generateNaturalSequence(count));
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + shuffledNumbers[i] + '.jpg',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateComents(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
    };
  }
  return photos;
};

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

var renderPhotos = function () {
  var similarPhotoElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photoNodes = generatePhotoNodes(generatePhotos(PHOTO_NUMBER));
  for (var i = 0; i < photoNodes.length; i++) {
    fragment.appendChild(photoNodes[i]);
  }
  similarPhotoElement.appendChild(fragment);
};

renderPhotos();

// new task
// open and close Edit popup
var ESC_KEYCODE = 27;
var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var popupEdit = imgUpload.querySelector('.img-upload__overlay');
var uploadCancel = imgUpload.querySelector('#upload-cancel');
var commentTextarea = popupEdit.querySelector('textarea[name="description"]');

var onPopupEditKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE)   {
    // to prevent macOS close full screen
    evt.preventDefault();
    if (document.activeElement !== commentTextarea) {
      closePopupEdit();
    }
  }
};

var onUploadFileChange = function () {
  popupEdit.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEditKeydown);
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

// edit image scale
var MIN_DECREASE_SCALE = 0;
var MAX_INCREASE_SCALE = 100;
var SCALE_STEP = 25;
var buttonDecreaseSize = popupEdit.querySelector('.scale__control--smaller');
var buttonIncreaseSize = popupEdit.querySelector('.scale__control--bigger');
var scaleControl = popupEdit.querySelector('.scale__control--value');
var editingImage = popupEdit.querySelector('.img-upload__preview img');

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

// change effects
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
var effectsPin = popupEdit.querySelector('.effect-level__pin');
var effect = popupEdit.querySelector('.effects');
var currentEffect;
var slideBar = document.querySelector('.img-upload__effect-level');
effect.addEventListener('change', function (evt) {
  currentEffect = evt.target.value;
  editingImage.className = ['effects__preview--' + currentEffect];
  editingImage.style = {};
  slideBar.classList.remove('hidden');
  if (currentEffect === 'none') {
    slideBar.classList.add('hidden');
  }
});

effectsPin.addEventListener('mouseup', function (evt) {
  // var currentEffect = popupEdit.querySelector('input[name="effect"]:checked').value; // none || chrome etc
  if (currentEffect === 'none') {
    return;
  }
  var effectsLevelLineWidth = evt.target.parentElement.offsetWidth; // width parent
  var effectsPinLevel = evt.target.offsetLeft; // left from parent
  var currentEffectProperties = FILTER_OPTIONS[currentEffect];
  var currentProportion = effectsPinLevel / effectsLevelLineWidth;
  var currentEffectLevel = (currentEffectProperties.max - currentEffectProperties.min) * currentProportion + currentEffectProperties.min;
  editingImage.style.filter = currentEffectProperties.type + '(' + currentEffectLevel + currentEffectProperties.suffix + ')';
});
