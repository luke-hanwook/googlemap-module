# googlemap-module

[Demo](https://luke-hanwook.github.io/googlemap-module)

## Description  
This is a module for customized google maps api.  
it's an uncompleted project but you can refer to below list.

1. [history-map-state](https://github.com/luke-hanwook/googlemap-module/tree/master/src/history-map-state)  
    You can control the map state with browser forward and back button.  
    ```
    var history = new gmodule.HistoryMapState(map, markerCluste, { isUseMovekeyOfBrowser: true });

    new gmodule.ControlPageMoveView(map, history)
    ```
    ![Demo Image](./googlemapstate.gif?raw=true)

### Tested Browser
- Chrome
- IE(10+)
- Firefox

### Using Tech Stack
- Javascript (ES5+)
- babel 7
- jasmine
- lite-server