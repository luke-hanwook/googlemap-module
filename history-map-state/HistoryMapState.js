function BackSpaceMap(map, markerCluster) {
  this.map_ = map;
  this.markerCluster_ = markerCluster;
  this.mapStateStack_ = [];

  var that = this;
  google.maps.event.addListener(this.markerCluster_, 'clusterclick', function(cluster) {
    window.history.pushState('forward', null, './#forward');
    var mapState = {
      center : {
        lat : that.map_.getCenter().lat(),
        lng : that.map_.getCenter().lng()
      },
      zoom : that.map_.getZoom()
    };
    that.mapStateStack_.push(mapState);
  });

  window.onpopstate = function () {
    if(that.mapStateStack_.length > 0) {
      var prevMapState = that.mapStateStack_.pop();
      that.map_.setZoom(prevMapState.zoom);
      that.map_.setCenter({
        lat : prevMapState.center.lat,
        lng : prevMapState.center.lng
      });
    }
  }
}
