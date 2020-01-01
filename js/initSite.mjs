const initSite = setup => {

  const initListeners = () => {
    window.windowListeners = {
      resize: [],
      scroll: [],
      click: [],
      orientationchange: [],
      mousemove: [],
    }

    // for each event name
    for (let eventName in window.windowListeners) {

      // add a listener for the event
      window.addEventListener(eventName, event => {
        const listener = window.windowListeners[eventName];

        // with all the functions defined on it
        for (let fn in listener) {
          if (listener.hasOwnProperty(fn)) listener[fn](event)
        }
      })
    }
  }
  initListeners()

  for (let fn in setup) {
    setup[fn]()
  }
}

export default initSite