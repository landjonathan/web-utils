const headerClass = ({
                       headerMarker = 'data-site-header',
                       toggleClass = 'initial',
                       toggleAdd = false,
                       thresholdMarker = 'data-site-header-threshold',
                       thresholdOffset = 0,
                       thresholdBottom = false,
                       afterThreshold = false
                     } = {}) => {
  let $siteHeader = document.querySelector(`[${headerMarker}]`)
  if (!$siteHeader) return false

  let $thresholdElement = document.querySelector(`[${thresholdMarker}]`)
  const offsetPosition = thresholdBottom ? 'bottom' : 'top'
  const offset = afterThreshold ? 0 : $siteHeader.clientHeight
  let threshold
  const setThreshold = () =>
    threshold =
      $thresholdElement
      ? $thresholdElement
        .getBoundingClientRect()[offsetPosition]
      - offset
      + document
        .documentElement
        .scrollTop
      + thresholdOffset

      : thresholdOffset

  setThreshold()
  const setHeaderClass = () => {
    const force = toggleAdd ? window.scrollY >= threshold : window.scrollY <= threshold
    $siteHeader.classList.toggle(toggleClass, force)
  }
  windowListeners.scroll.push(setHeaderClass)
  windowListeners.resize.push(setThreshold)
  setHeaderClass()
}

export default headerClass