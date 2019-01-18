describe('gmododule.HistoryMapState', ()=>{
  let history, map, markerCluster, mapState

  beforeEach(()=>{
    map = new google.maps.Map(document.createElement('div'), {
      center: { lat : 36.4800984, lng : 127.2189976 },
      zoom: 3
    })
    markerCluster = new MarkerClusterer(map, markers)
    history = new gmodule.HistoryMapState(map, markerCluster)
  })

  describe('의존성 주입', ()=>{
    it('map을 주입받지 않으면 에러를 던진다', ()=>{
      const actual = ()=>(history = new gmodule.HistoryMapState(null, markerCluster))
      expect(actual).toThrowError()
    })

    it('markerCluster를 주입받지 않으면 에러를 던진다', ()=>{
      const actual = ()=>(history = new gmodule.HistoryMapState(map, null))
      expect(actual).toThrowError()
    })
  })

  describe('getCurrentState', ()=>{
    it('스냅된 map의 상태를 반환한다', ()=>{
      const retState = history.getCurrentState()
      const snapState = {
        center : {
          lat : map.getCenter().lat(),
          lng : map.getCenter().lng()
        },
        zoom : map.getZoom()
      }
      expect(retState.zoom).toBe(snapState.zoom)
    })
  })

  describe('snapCurrentState', ()=>{
    it('현재 map의 상태를 스냅한다', ()=>{
      history.snapCurrentState()
      const snapState = {
        center : {
          lat : map.getCenter().lat(),
          lng : map.getCenter().lng()
        },
        zoom : map.getZoom()
      }
      expect(history.snapCurrentState().getCurrentState().zoom).toBe(snapState.zoom)
    })
  })

  describe('saveCurrentState', ()=>{
    it('현재 map의 상태를 저장한다', ()=>{
      const initialSize = history.getSize()
      history.saveCurrentState()
      expect(history.getSize()).toBe(initialSize + 1)
    })
  })

})
