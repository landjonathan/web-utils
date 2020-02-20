const scrollActiveLabel = (
  {
    containerDataIdentifier = 'data-scroll-labels-container',
    elementDataIdentifier = 'data-scroll-element',
    labelDataIdentifier = 'data-scroll-label',
    toggleClass = 'active',
    rootMargin = '0px',
    threshold = .5,
    onlyFirst = false,
    onToggleCallback = (state, $element, $label) => {}
  } = {},
) => {

  document.querySelectorAll(`[${containerDataIdentifier}]`).forEach($container => {
    const $elements = $container.querySelectorAll(`[${elementDataIdentifier}]`)
    const $labels = $container.querySelectorAll(`[${labelDataIdentifier}]`)

    const observer = new IntersectionObserver(entries =>
      entries.forEach(entry => {
        const key = entry.target.getAttribute(elementDataIdentifier)
        const $targetLabels = [...$labels].filter(l => l.getAttribute(labelDataIdentifier) === key)
        $targetLabels.forEach($el => {
          const force = entry.isIntersecting
          $el.classList.toggle(toggleClass, force)
          onToggleCallback(force, entry.target, $el)
        })
      }), { rootMargin, threshold })

    $elements.forEach($el => {
      observer.observe($el)
    })
  })
}