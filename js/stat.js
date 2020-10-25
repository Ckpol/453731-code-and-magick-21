'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 15;
  var TEXT_WIDTH = 50;
  var TEXT_HIGHT = 16;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var SPACE_BETWEEN_BARS = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };


  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      maxElement = Math.max(maxElement, arr[i]);
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(
        ctx,
        CLOUD_X + GAP,
        CLOUD_Y + GAP,
        'rgba(0, 0, 0, 0.7)'
    );
    renderCloud(
        ctx,
        CLOUD_X,
        CLOUD_Y,
        '#fff'
    );

    ctx.fillStyle = '#000';
    ctx.font = `${TEXT_HIGHT}` + 'px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + TEXT_WIDTH);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + TEXT_WIDTH + FONT_GAP);

    ctx.fillStyle = '#000';
    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {

      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, 100%, ' + `${Math.round(Math.random() * 100)}` + '%)';
      }

      ctx.fillRect(
          CLOUD_X + SPACE_BETWEEN_BARS + (BAR_WIDTH + SPACE_BETWEEN_BARS) * i,
          CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HIGHT,
          BAR_WIDTH,
          (BAR_HEIGHT * times[i] * -1 / maxTime)
      );

      ctx.fillStyle = '#000';
      ctx.fillText(
          players[i],
          CLOUD_X + SPACE_BETWEEN_BARS + (BAR_WIDTH + SPACE_BETWEEN_BARS) * i,
          CLOUD_Y + CLOUD_HEIGHT - GAP
      );

      ctx.fillText(
          Math.round(times[i]),
          CLOUD_X + SPACE_BETWEEN_BARS + (BAR_WIDTH + SPACE_BETWEEN_BARS) * i,
          CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HIGHT - (BAR_HEIGHT * times[i] / maxTime) - GAP
      );
    }
  };

})();

