"use strict";

describe('gmododule.HistoryMapState', function () {
  var history, map, markerCluster, mapState;
  beforeEach(function () {
    map = new google.maps.Map(document.createElement('div'), {
      center: {
        lat: 36.4800984,
        lng: 127.2189976
      },
      zoom: 3
    });
    markerCluster = new MarkerClusterer(map, markers);
    history = new gmodule.HistoryMapState(map, markerCluster, {
      isMaintainedState: true
    });
  });
  describe('의존성 주입', function () {
    it('map을 주입받지 않으면 에러를 던진다', function () {
      var actual = function actual() {
        return history = new gmodule.HistoryMapState(null, markerCluster, {
          isMaintainedState: true
        });
      };

      expect(actual).toThrowError();
    });
    it('markerCluster를 주입받지 않으면 에러를 던진다', function () {
      var actual = function actual() {
        return history = new gmodule.HistoryMapState(map, null, {
          isMaintainedState: true
        });
      };

      expect(actual).toThrowError();
    });
  });
  describe('getCurrentState', function () {
    it('스냅된 map의 상태를 반환한다', function () {
      var retState = history.getCurrentState();
      var snapState = {
        center: {
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng()
        },
        zoom: map.getZoom()
      };
      expect(retState.zoom).toBe(snapState.zoom);
    });
  });
  describe('snapCurrentState', function () {
    it('현재 map의 상태를 스냅한다', function () {
      history.snapCurrentState();
      var snapState = {
        center: {
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng()
        },
        zoom: map.getZoom()
      };
      expect(history.snapCurrentState().getCurrentState().zoom).toBe(snapState.zoom);
    });
  }); // describe('saveCurrentState', ()=>{
  //   it('현재 map의 상태를 저장한다', ()=>{
  //     const initialSize = history.getSize()
  //     history.saveCurrentState()
  //     expect(history.getSize()).toBe(initialSize + 1)
  //   })
  // })
});