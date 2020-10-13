'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QUANTITY = 4;

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
};

var getFullName = function (names, lastnames) {
  var fullName = getRandomItem(names) + ' ' + getRandomItem(lastnames);
  return fullName;
};

var createWizard = function (names, lastNames, clothesColor, eyesColor) {
  var wizard = {};
  wizard.name = getFullName(names, lastNames);
  wizard.coatColor = getRandomItem(clothesColor);
  wizard.eyesColor = getRandomItem(eyesColor);

  return wizard;
};

var wizards = [];
for (var j = 0; j < WIZARDS_QUANTITY; j++) {
  wizards.push(createWizard(WIZARD_NAMES, WIZARD_LAST_NAMES, WIZARD_COLOR, WIZARD_EYES_COLOR));
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = setup.querySelector('.setup-fireball-wrap');
var wizardCoatInput = setup.querySelector('input[name = "coat-color"]');
var wizardEyesInput = setup.querySelector('input[name = "eyes-color"]');
var fireballColorInput = fireballColor.querySelector('input[name = "fireball-color"]');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var onSubmitPopupEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
};

var onInputNameFocus = function (evt) {
  var target = evt.target;
  if (evt.type === 'focusin' && target.name === 'username') {
    document.removeEventListener('keydown', onPopupEscPress);
  }

  if (evt.type === 'focusout') {
    document.addEventListener('keydown', onPopupEscPress);
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setup.addEventListener('focusin', onInputNameFocus);
  setup.addEventListener('focusout', onInputNameFocus);
  setup.addEventListener('keydown', onSubmitPopupEnterPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.removeEventListener('focusin', onInputNameFocus);
  setup.removeEventListener('focusout', onInputNameFocus);
  setup.removeEventListener('keydown', onSubmitPopupEnterPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

setupSubmit.addEventListener('click', function () {
  closePopup();
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
});

var changeElemColor = function (colors, hiddenInput, evt) {
  var result = getRandomItem(colors);
  evt.target.style = `fill: ${result}`;
  hiddenInput.value = result;
};

wizardCoat.addEventListener('click', function (evt) {
  changeElemColor(WIZARD_COLOR, wizardCoatInput, evt);
});

wizardEyes.addEventListener('click', function (evt) {
  changeElemColor(WIZARD_EYES_COLOR, wizardEyesInput, evt);
});

fireballColor.addEventListener('click', function (evt) {
  var result = getRandomItem(FIREBALL_COLOR);
  evt.target.style = `background-color: ${result}`;
  fireballColorInput.value = result;
});
