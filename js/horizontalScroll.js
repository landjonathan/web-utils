const horizontalScroll = () => {
  document.querySelectorAll('[data-horizontal-scroll]').forEach($el => {
    $el.addEventListener('wheel', event => {
      if (event.deltaY && !event.deltaX) {
        $el.scrollLeft += event.deltaY
        event.preventDefault()
      }
    })
  })
}