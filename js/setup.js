'use strict';

(function () {
  window.setup = {
    WIZARD_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_QUANTITY = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var getFullName = function (names, lastnames) {
    var fullName = window.util.getRandomItem(names) + ' ' + window.util.getRandomItem(lastnames);
    return fullName;
  };

  var createWizard = function (names, lastNames, clothesColor, eyesColor) {
    var wizard = {};
    wizard.name = getFullName(names, lastNames);
    wizard.coatColor = window.util.getRandomItem(clothesColor);
    wizard.eyesColor = window.util.getRandomItem(eyesColor);

    return wizard;
  };

  var wizards = [];
  for (var j = 0; j < WIZARDS_QUANTITY; j++) {
    wizards.push(createWizard(
        WIZARD_NAMES,
        WIZARD_LAST_NAMES,
        window.setup.WIZARD_COLOR,
        window.setup.WIZARD_EYES_COLOR
    ));
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

})();

document.querySelector('.setup-similar').classList.remove('hidden');


