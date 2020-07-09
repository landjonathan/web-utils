const scrollActiveLabel = (
  {
    containerDataIdentifier = 'data-scroll-labels-container',
    elementDataIdentifier = 'data-scroll-element',
    labelDataIdentifier = 'data-scroll-label',
    overflowDataIdentifier = 'data-scroll-overflow',
    offsetDataIdentifier = 'data-site-header',
    offsetTop = 0,
    useOffsetElementMarginBottom = true,
    markLabels = true,
    markElements = true,
    toggleClass = 'active',
    scrollToTargetLabel = true,
    onChanged = (target, $elements, $labels) => {}
  } = {},
) => {
  const $offsetElement = document.querySelector(`[${offsetDataIdentifier}]`)
  const offset = $offsetElement.getBoundingClientRect().height + (useOffsetElementMarginBottom ? parseFloat(getComputedStyle($offsetElement).marginBottom) + 1 : 0)

  document.querySelectorAll(`[${containerDataIdentifier}]`).forEach($container => {
    const $elements = $container.querySelectorAll(`[${elementDataIdentifier}]`)
    const $labels = $container.querySelectorAll(`[${labelDataIdentifier}]`)
    const $nav = $container.querySelector(`[${overflowDataIdentifier}]`)

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

        const $firstActiveLabel = [...$labels].find($label => $label.classList.contains(toggleClass))
        if ($firstActiveLabel && scrollToTargetLabel && $nav) {
          let target
          if (window.lang === 'he') {
            const labelWidth = $firstActiveLabel.clientWidth + parseFloat(getComputedStyle($firstActiveLabel).marginRight) + parseFloat(getComputedStyle($nav).paddingRight)
            const labelStart = $firstActiveLabel.offsetLeft + labelWidth
            target = ($nav.scrollWidth - $nav.clientWidth) - ($nav.clientWidth - labelStart)
            if (window.device && window.device.ios()) { target = target - ($nav.scrollWidth - $nav.clientWidth) }
          } else {
            target = $firstActiveLabel.offsetLeft - parseFloat(getComputedStyle($firstActiveLabel).marginLeft) - parseFloat(getComputedStyle($nav).paddingLeft)
          }

          $nav.scrollTo({
            behavior: 'smooth',
            left: target
          })
        }
      }
    })

    setState()
    windowListeners.scroll.push(setState)
  })
}

export default scrollActiveLabel