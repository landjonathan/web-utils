const scrollHeight = ({
                        identifier = 'data-scroll-height',
                        variable = '--scroll-height'
                      } = {}) => {
  const setScrollHeights = () => {
    document.querySelectorAll('[' + identifier + ']').forEach(value => {
      const data = value.getAttribute(identifier);
      const source = data ? value.querySelector(data) : value
      value.style.setProperty(variable, source.scrollHeight + 'px')
    })
  }
  // after fonts and images loaded
  window.addEventListener('load', () => { setScrollHeights() })
  windowListeners.resize.push(setScrollHeights)
}

export default scrollHeight
