const headerClass = (
  headerId = 'site-header',
  thresholdMarker = 'data-site-header-threshold',
  thresholdOffset = 0,
) => {
  let $siteHeader = document.getElementById(headerId)
  if (!$siteHeader) return false

  let $thresholdElement = document.querySelector(`[${thresholdMarker}]`)
  let threshold =
    $thresholdElement
      ? document
        .querySelector('[data-site-header-threshold]')
        .getBoundingClientRect().top
      + document
        .documentElement
        .scrollTop
      + thresholdOffset
      : thresholdOffset

  const setHeaderClass = () => {
    $siteHeader.classList.toggle('initial', window.scrollY <= threshold)
  }
  windowListeners.scroll.push(setHeaderClass)
}