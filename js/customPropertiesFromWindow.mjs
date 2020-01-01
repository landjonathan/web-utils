const customPropertiesFromWindow = ({
                                      properties = [{
                                        property: 'scrollY',
                                        variable: '--scroll-y',
                                        events: ['scroll', 'resize'],
                                        calculation: val => (val / window.innerHeight).toFixed(6)
                                      }]
                                    } = {}) => {

  for (const {property, variable, events, calculation} of properties) {
    const setState = () => {
      let value = calculation ? calculation(window[property]) : window[property]
      document.documentElement.style.setProperty(variable, value)
    }

    setState()
    for (const event of events)
      window.windowListeners[event].push(setState)
  }
}

export default customPropertiesFromWindow