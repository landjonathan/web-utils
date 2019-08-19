const headerClass = (
  headerId = 'site-header',
  thresholdMarker = 'data-site-header-threshold',
  thresholdOffset = 0,
  className = 'initial',
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

  const setHeaderClass = () => {
    $siteHeader.classList.toggle(className, window.scrollY <= threshold)
  }
  windowListeners.scroll.push(setHeaderClass)
  setHeaderClass()
}