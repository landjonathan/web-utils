const scrollActiveLabel = (
  {
    containerDataIdentifier = 'data-scroll-labels-container',
    elementDataIdentifier = 'data-scroll-element',
    labelDataIdentifier = 'data-scroll-label',
    offsetDataIdentifier = 'data-site-header',
    offsetTop = 0,
    useOffsetElementMarginBottom = true,
    markLabels = true,
    markElements = true,
    toggleClass = 'active',
    onChanged = (target, $elements, $labels) => {}
  } = {},
) => {
  const $offsetElement = document.querySelector(`[${offsetDataIdentifier}]`)
  const offset = $offsetElement.getBoundingClientRect().height + (useOffsetElementMarginBottom ? parseFloat(getComputedStyle($offsetElement).marginBottom) + 1 : 0)

  document.querySelectorAll(`[${containerDataIdentifier}]`).forEach($container => {
    const $elements = $container.querySelectorAll(`[${elementDataIdentifier}]`)
    const $labels = $container.querySelectorAll(`[${labelDataIdentifier}]`)

    let lastTarget = {}

    const setState = () => requestAnimationFrame(() => {
      const tops = {}
      let currentTarget = { top: -Infinity }

      $elements.forEach($el => {
        const key = $el.getAttribute(elementDataIdentifier)
        tops[key] = $el.getBoundingClientRect().top - offset - offsetTop
      })

      for (const [key, top] of Object.entries(tops)) {
        if (top <= 0) {
          if (top > currentTarget.top) {
            currentTarget = { key, top }
          }
        }
      }

      if (markLabels)
        $labels.forEach($el => $el.classList.toggle(toggleClass, $el.getAttribute(labelDataIdentifier) === currentTarget.key))
      if (markElements)
        $elements.forEach($el => $el.classList.toggle(toggleClass, $el.getAttribute(elementDataIdentifier) === currentTarget.key))

      if (!lastTarget.key || lastTarget.key !== currentTarget.key) {
        if (typeof onChanged === 'function' && lastTarget.key) {
          onChanged(
            lastTarget,
            [...$elements].filter($el => $el.getAttribute(elementDataIdentifier) === lastTarget.key),
            [...$labels].filter($el => $el.getAttribute(labelDataIdentifier) === lastTarget.key),
          )
        }

        lastTarget = currentTarget
      }
    })

    setState()
    windowListeners.scroll.push(setState)
  })
}

export default scrollActiveLabel