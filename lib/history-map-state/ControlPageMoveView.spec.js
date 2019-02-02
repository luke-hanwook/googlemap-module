"use strict";

describe('gmodule.ControlPageMoveView', function () {
  var map, markerCluster, historyMapState, cpmView, buttonEl;
  beforeEach(function () {
    map = new google.maps.Map(document.createElement('div'), {
      center: {
        lat: 36.4800984,
        lng: 127.2189976
      },
      zoom: 3
    });
    markerCluster = new MarkerClusterer(map, markers);
    historyMapState = new gmodule.HistoryMapState(map, markerCluster, {
      isMaintainedState: true
    });
    buttonEl = document.createElement('div');
    var backButton = document.createElement('button');
    backButton.setAttribute('data-btn-Type', 'back');
    var forwardButton = document.createElement('button');
    forwardButton.setAttribute('data-btn-Type', 'forward');
    buttonEl.appendChild(backButton);
    buttonEl.appendChild(forwardButton);
    cpmView = new gmodule.ControlPageMoveView(historyMapState, {
      buttonEl: buttonEl
    });
  });
  describe('movePage()', function () {
    it('back버튼 클릭 시 historyMapState의 상태를 뒤로가기 한다.', function () {
      spyOn(historyMapState, 'historyBack');
      buttonEl.querySelector('button[data-btn-type="back"]').click();
      expect(historyMapState.historyBack).toHaveBeenCalled();
    });
    it('forward버튼 클릭 시 historyMapState의 상태를 앞으로가기 한다.', function () {
      spyOn(historyMapState, 'historyForward');
      buttonEl.querySelector('button[data-btn-type="forward"]').click();
      expect(historyMapState.historyForward).toHaveBeenCalled();
    });
  });
});