const horizontalScroll = ({
                            scrollUpBeforeStart = true,
                            scrollDownAfterEnd = true,
                            cancelOnHorizontalScroll = true,
                          } = {}) => {
  document.querySelectorAll('[data-horizontal-scroll]').forEach($el => {
    const setState = event => {
      if (event.deltaY && !event.deltaX) {
        const scrollAtStart = !scrollUpBeforeStart || event.deltaY < 0 && $el.scrollLeft > 0
        const scrollAtEnd = !scrollDownAfterEnd || event.deltaY > 0 && $el.scrollLeft < ($el.scrollWidth - $el.clientWidth)
        if (scrollAtStart || scrollAtEnd){
          $el.scrollLeft += event.deltaY
          event.preventDefault()
        }
      }
    }
    $el.addEventListener('wheel', setState)

    if (cancelOnHorizontalScroll) {
      const remove = event => {
        if (event.deltaX) {
          $el.removeEventListener('wheel', setState)
          window.removeEventListener('wheel', remove)
        }
      }
      window.addEventListener('wheel', remove)
    }
  })
}

export default horizontalScroll
