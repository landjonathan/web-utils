const windowHeight = () => {
  const setInitialWindowHeight = () => setTimeout(() => document.documentElement.style.setProperty('--initial-window-height', document.documentElement.clientHeight + 'px'), 75)
  setInitialWindowHeight()

  const setWindowHeight = () => setTimeout(() => document.documentElement.style.setProperty('--window-height', document.documentElement.clientHeight + 'px'), 75)
  setWindowHeight()

  window.windowListeners.resize.push(setWindowHeight)

  // handle orientation change on iPad
  const userAgent = navigator.userAgent.toLowerCase()
  const iPad = () =>
    (!!userAgent.match(/mac/g) // ios
      && !userAgent.match(/phone/g)) // not phone

  if ((window.device && window.device.tablet()) || iPad()) {
    windowListeners.orientationchange.push(setWindowHeight)
  }
}

export default windowHeight