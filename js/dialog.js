'use strict';

(function () {
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

  var form = setup.querySelector('.setup-wizard-form');
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var START_DIALOG_POSITION_TOP = getComputedStyle(setup).top;
  var START_DIALOG_POSITION_LEFT = getComputedStyle(setup).left;

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var onFormStopSubmit = function (evt) {
    evt.preventDefault();
  };

  var onInputNameFocus = function (evt) {
    var target = evt.target;
    if (evt.type === 'focusin' && target.name === 'username') {
      document.removeEventListener('keydown', onPopupEscPress);
      setup.addEventListener('submit', onFormStopSubmit);
    }

    if (evt.type === 'focusout') {
      document.addEventListener('keydown', onPopupEscPress);
      setup.removeEventListener('submit', onFormStopSubmit);
    }
  };

  var onCloseElemEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var onOpenElemEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setup.addEventListener('focusin', onInputNameFocus);
    setup.addEventListener('focusout', onInputNameFocus);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.top = START_DIALOG_POSITION_TOP;
    setup.style.left = START_DIALOG_POSITION_LEFT;
    document.removeEventListener('keydown', onPopupEscPress);
    setup.removeEventListener('focusin', onInputNameFocus);
    setup.removeEventListener('focusout', onInputNameFocus);
  };

  if (!setup.matches('hidden')) {
    openPopup();
  }

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', onOpenElemEnterPress);

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', onCloseElemEnterPress);

  setupSubmit.addEventListener('click', function () {
    form.submit();
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

  window.colorize(wizardCoat, window.setup.WIZARD_COLOR, wizardCoatInput);
  window.colorize(wizardEyes, window.setup.WIZARD_EYES_COLOR, wizardEyesInput);
  window.colorize(fireballColor, window.setup.FIREBALL_COLOR, fireballColorInput);

})();
