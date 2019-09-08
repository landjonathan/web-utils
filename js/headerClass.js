const headerClass = (
  headerId = 'site-header',
  toggeleClass = 'initial',
  toggleAdd = false,
  thresholdMarker = 'data-site-header-threshold',
  thresholdOffset = 0,
) => {
  let $siteHeader = document.getElementById(headerId)
  if (!$siteHeader) return false

  let $thresholdElement = document.querySelector(`[${thresholdMarker}]`)
  let threshold =
    $thresholdElement
      ? $thresholdElement
        .getBoundingClientRect().top
      - $siteHeader
        .clientHeight
      + document
        .documentElement
        .scrollTop
      + thresholdOffset
      : thresholdOffset
  console.log(threshold)

  const setHeaderClass = () => {
    const force = toggleAdd ? window.scrollY >= threshold : window.scrollY <= threshold
    $siteHeader.classList.toggle(toggeleClass, force)
  }
  windowListeners.scroll.push(setHeaderClass)
  setHeaderClass()
}