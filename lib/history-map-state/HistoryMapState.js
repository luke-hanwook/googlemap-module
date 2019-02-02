"use strict";

var gmodule = gmodule || {};

gmodule.HistoryMapState = function (map, markerCluster, options) {
  var _this = this;

  if (!map) throw Error('map');
  if (!markerCluster) throw Error('markerCluster');
  this.map_ = map;
  this.markerCluster_ = markerCluster;
  this.mapState_ = {};
  this.snapCurrentState();
  this.saveHistory('replaceState');
  google.maps.event.addListener(this.map_, 'zoom_changed', function () {
    var curState = _this.snapCurrentState().getCurrentState();

    var flag = curState.zoom - (window.history.state ? window.history.state.zoom : 0) > 0;
    if (flag) _this.saveHistory('pushState');
  });
  google.maps.event.addListener(this.map_, 'dragend', function (evt) {
    _this.snapCurrentState();

    _this.saveHistory('pushState');
  });

  if (options.isUseMovekeyOfBrowser) {
    window.addEventListener('popstate', function (evt) {
      _this.setMap(evt);
    });
  }
};

gmodule.HistoryMapState.prototype.getCurrentState = function () {
  return this.mapState_;
};

gmodule.HistoryMapState.prototype.snapCurrentState = function () {
  this.mapState_ = {
    center: {
      lat: this.map_.getCenter().lat(),
      lng: this.map_.getCenter().lng()
    },
    zoom: this.map_.getZoom()
  };
  return this;
};

gmodule.HistoryMapState.prototype.setMap = function (_ref) {
  var state = _ref.state;
  this.map_.setZoom(state.zoom);
  this.map_.setCenter(state.center);
};

gmodule.HistoryMapState.prototype.saveHistory = function (methodName) {
  var _this2 = this;

  var makeStateUrl = function makeStateUrl() {
    return '#[' + _this2.mapState_.center.lat + ',' + _this2.mapState_.center.lng + ']';
  };

  window.history[methodName](this.mapState_, null, makeStateUrl());
};

gmodule.HistoryMapState.prototype.printHistory = function (tag) {
  console.log(tag, window.history.state);
};

gmodule.HistoryMapState.prototype.historyBack = function () {
  window.history.back();
};

gmodule.HistoryMapState.prototype.historyForward = function () {
  window.history.forward();
};