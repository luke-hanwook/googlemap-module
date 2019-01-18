var gmodule = gmodule || {}

gmodule.ControlPageMoveView = function(map, historyMapState) {
  this.map_ = map
  this.historyMapState_ = historyMapState

  this.createMapMoveBtnElement()
}

gmodule.ControlPageMoveView.prototype.createMapMoveBtnElement = function() {
  const divEl = document.createElement('div')
  divEl.setAttribute('id', 'mapMoveBtn')

  const backTextEl = document.createElement('div')
  const forwardTextEl = document.createElement('div')

  const backButton = document.createElement('button')
  backButton.setAttribute('data-btn-Type', 'back')
  backTextEl.innerHTML = '뒤로'
  backButton.appendChild(backTextEl)

  const forwardButton = document.createElement('button')
  forwardButton.setAttribute('data-btn-Type', 'forward')
  forwardTextEl.innerHTML = '앞으로'
  forwardButton.appendChild(forwardTextEl)

  divEl.appendChild(backButton)
  divEl.appendChild(forwardButton)

  divEl.index = 1;
  console.log(google.maps.ControlPosition)
  this.map_.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(divEl);

  this.bindEvent(divEl)
}

gmodule.ControlPageMoveView.prototype.bindEvent = function (divEl) {
  Array.from(divEl.querySelectorAll('button')).forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
      this.movePage(btn.dataset)
    })
  })
}

gmodule.ControlPageMoveView.prototype.movePage = function({btnType}) {
  if(btnType === 'back')
    this.historyMapState_.historyBack()
  else if(btnType === 'forward')
    this.historyMapState_.historyForward()
}
