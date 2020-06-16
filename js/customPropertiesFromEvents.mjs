const customPropertiesFromEvents = ({
                                      events = [{
                                        eventName: 'mousemove',
                                        values: [
                                          { key: 'clientX', calculation: x => (x / window.innerWidth).toFixed(6) },
                                          { key: 'clientY', calculation: y => (y / window.innerHeight).toFixed(6), variable: '--client-y' }
                                        ],
                                      }]
                                    } = {}) => {
  for (const {eventName, values} of events) {
    const setState = event => {
      requestAnimationFrame(() => {
        for (let { key, variable, calculation } of values) {
          variable = variable || '--' + key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
          if (event[key]) {
            const value = calculation ? calculation(event[key]) : event[key]
            document.documentElement.style.setProperty(variable, value)
          }
        }
      })
    }

    if (window.windowListeners && window.windowListeners[eventName])
      window.windowListeners[eventName].push(setState)
    else
      window.addEventListener(eventName, setState)
  }
}

export default customPropertiesFromEvents
// camel to kebab — https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
