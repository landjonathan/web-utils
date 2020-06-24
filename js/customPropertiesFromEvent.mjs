const customPropertiesFromEvent = ({
                                     eventTarget = window,
                                     propertyTarget = document.documentElement,
                                     name = 'mousemove',
                                     values = [
                                       { key: 'clientX', calculation: x => (x / window.innerWidth).toFixed(6) },
                                       {
                                         key: 'clientY',
                                         calculation: y => (y / window.innerHeight).toFixed(6),
                                         variable: '--client-y'
                                       }
                                     ],
                                   } = {}) => {
  const setState = event => {
    requestAnimationFrame(() => {
      for (let { key, variable, calculation } of values) {
        variable = variable || '--' + key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
        if (event[key]) {
          const value = calculation ? calculation(event[key]) : event[key]
          propertyTarget.style.setProperty(variable, value)
        }
      }
    })
  }

  if (eventTarget === window && window.windowListeners && window.windowListeners[name])
    window.windowListeners[name].push(setState)
  else
    eventTarget.addEventListener(name, setState)
}

export default customPropertiesFromEvent
// camel to kebab — https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
