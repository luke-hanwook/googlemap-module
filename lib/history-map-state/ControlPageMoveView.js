"use strict";

var gmodule = gmodule || {};

gmodule.ControlPageMoveView = function (map, historyMapState) {
  this.map_ = map;
  this.historyMapState_ = historyMapState;
  this.createMapMoveBtnElement();
};

gmodule.ControlPageMoveView.prototype.createMapMoveBtnElement = function () {
  var divEl = document.createElement('div');
  divEl.setAttribute('id', 'mapMoveBtn');
  var backTextEl = document.createElement('div');
  var forwardTextEl = document.createElement('div');
  var backButton = document.createElement('button');
  backButton.setAttribute('data-btn-Type', 'back');
  backTextEl.innerHTML = '뒤로';
  backButton.appendChild(backTextEl);
  var forwardButton = document.createElement('button');
  forwardButton.setAttribute('data-btn-Type', 'forward');
  forwardTextEl.innerHTML = '앞으로';
  forwardButton.appendChild(forwardTextEl);
  divEl.appendChild(backButton);
  divEl.appendChild(forwardButton);
  divEl.index = 1;
  this.map_.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(divEl);
  this.bindEvent(divEl);
};

gmodule.ControlPageMoveView.prototype.bindEvent = function (divEl) {
  var _this = this;

  Array.from(divEl.querySelectorAll('button')).forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      _this.movePage(btn.getAttribute('data-btn-type'));
    });
  });
};

gmodule.ControlPageMoveView.prototype.movePage = function (btnType) {
  if (btnType === 'back') this.historyMapState_.historyBack();else if (btnType === 'forward') this.historyMapState_.historyForward();
};