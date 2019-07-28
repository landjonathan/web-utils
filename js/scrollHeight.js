const scrollHeight = () => {
  const setScrollHeights = () => {
    document.querySelectorAll('[data-scroll-height]').forEach(value => {
      const data = value.getAttribute('data-scroll-height');
      const source = data ? value.querySelector(data) : value
      value.style.setProperty('--scroll-height', source.scrollHeight + 'px')
    })
  }
  setScrollHeights()
  windowListeners.resize.push(setScrollHeights)
}