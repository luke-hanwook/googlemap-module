var gmodule = gmodule || {}

gmodule.HistoryMapState = function(map, markerCluster, options) {
  if(!map) throw Error('map')
  if(!markerCluster) throw Error('markerCluster')
  this.map_ = map
  this.markerCluster_ = markerCluster
  this.mapState_ = {}
  this.snapCurrentState()
  this.saveHistory('replaceState')

  google.maps.event.addListener(this.map_, 'zoom_changed', ()=>{
    const curState = this.snapCurrentState().getCurrentState()
    let flag = curState.zoom - (window.history.state ? window.history.state.zoom : 0) > 0
    if(flag) this.saveHistory('pushState')
  })

  google.maps.event.addListener(this.map_, 'dragend', (evt)=>{
    this.snapCurrentState()
    this.saveHistory('pushState')
  })

  if(options.isUseMovekeyOfBrowser) {
    window.addEventListener('popstate', (evt)=>{
      this.setMap(evt)
    });
  }
}

gmodule.HistoryMapState.prototype.getCurrentState = function() {
  return this.mapState_
}

gmodule.HistoryMapState.prototype.snapCurrentState = function() {
  this.mapState_ = {
    center: {
      lat: this.map_.getCenter().lat(),
      lng: this.map_.getCenter().lng()
    },
    zoom: this.map_.getZoom()
  }
  return this
}

gmodule.HistoryMapState.prototype.setMap = function({state}) {
  this.map_.setZoom(state.zoom)
  this.map_.setCenter(state.center)
}

gmodule.HistoryMapState.prototype.saveHistory = function(methodName) {
  var makeStateUrl = ()=>{
    return '#[' + this.mapState_.center.lat + ',' + this.mapState_.center.lng + ']'
  }
  window.history[methodName](this.mapState_, null, makeStateUrl())
}

gmodule.HistoryMapState.prototype.printHistory = function(tag) {
  console.log(tag, window.history.state)
}

gmodule.HistoryMapState.prototype.historyBack = function() {
  window.history.back()
}

gmodule.HistoryMapState.prototype.historyForward = function() {
  window.history.forward()
}
