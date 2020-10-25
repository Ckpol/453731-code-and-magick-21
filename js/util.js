'use strict';

(function () {
  window.util = {
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * (arr.length))];
    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    }
  };
})();
