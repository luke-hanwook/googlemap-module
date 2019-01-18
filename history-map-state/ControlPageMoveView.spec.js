describe('gmodule.ControlPageMoveView', ()=>{
  let map, markerCluster, historyMapState, cpmView, buttonEl

  beforeEach(()=>{
    map = new google.maps.Map(document.createElement('div'), {
      center: { lat : 36.4800984, lng : 127.2189976 },
      zoom: 3
    })
    markerCluster = new MarkerClusterer(map, markers)
    historyMapState = new gmodule.HistoryMapState(map, markerCluster, {isMaintainedState: true})
    buttonEl = document.createElement('div')
    const backButton = document.createElement('button')
    backButton.setAttribute('data-btn-Type', 'back')
    const forwardButton = document.createElement('button')
    forwardButton.setAttribute('data-btn-Type', 'forward')
    buttonEl.appendChild(backButton)
    buttonEl.appendChild(forwardButton)
    cpmView = new gmodule.ControlPageMoveView(historyMapState, {buttonEl})
  })

  describe('movePage()', ()=>{
    it('back버튼 클릭 시 historyMapState의 상태를 뒤로가기 한다.', ()=>{
      spyOn(historyMapState, 'historyBack')
      buttonEl.querySelector('button[data-btn-type="back"]').click()
      expect(historyMapState.historyBack).toHaveBeenCalled()
    })

    it('forward버튼 클릭 시 historyMapState의 상태를 앞으로가기 한다.', ()=>{
      spyOn(historyMapState, 'historyForward')
      buttonEl.querySelector('button[data-btn-type="forward"]').click()
      expect(historyMapState.historyForward).toHaveBeenCalled()
    })
  })

})
