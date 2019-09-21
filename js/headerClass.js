const headerClass = (
  headerId = 'site-header',
  toggeleClass = 'initial',
  toggleAdd = false,
  thresholdMarker = 'data-site-header-threshold',
  thresholdOffset = 0,
  thresholdBottom = false,
  afterThreshold = false
) => {
  let $siteHeader = document.getElementById(headerId)
  if (!$siteHeader) return false

  let $thresholdElement = document.querySelector(`[${thresholdMarker}]`)
  const offsetPosition = thresholdBottom ? 'bottom' : 'top'
  const offest = afterThreshold ? 0 : $siteHeader.clientHeight
  let threshold
  const setThreshold = () =>
    threshold =
      $thresholdElement
      ? $thresholdElement
        .getBoundingClientRect()[offsetPosition]
      - offest
      + document
        .documentElement
        .scrollTop
      + thresholdOffset

      : thresholdOffset

  setThreshold()
  const setHeaderClass = () => {
    const force = toggleAdd ? window.scrollY >= threshold : window.scrollY <= threshold
    $siteHeader.classList.toggle(toggeleClass, force)
  }
  windowListeners.scroll.push(setHeaderClass)
  windowListeners.resize.push(setThreshold)
  setHeaderClass()
}