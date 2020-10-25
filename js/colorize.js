'use strict';

(function () {

  window.colorize = function (element, colors, hiddenInput) {

    element.addEventListener('click', function (evt) {
      var result = window.util.getRandomItem(colors);

      if (element.tagName.toLowerCase() === 'div') {
        evt.target.style = `background-color: ${result}`;
      } else {
        evt.target.style = `fill: ${result}`;
      }

      hiddenInput.value = result;
    });
  };
})();

