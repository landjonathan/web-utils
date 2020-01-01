const inViewClass = (
  {
    dataIdentifier = 'data-in-view-class',
    defaultClassName = 'in-view',
    rootMargin = '-1px',
    threshold = .25,
    onLoadFromBottom = true,
  } = {},
) => {
  const addClass = $el => $el.classList.add($el.getAttribute(dataIdentifier) || defaultClassName)

  const observer = new IntersectionObserver(entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting)
        addClass(entry.target)
    }), { rootMargin, threshold })

  document.querySelectorAll(`[${dataIdentifier}]`).forEach($el => {
    observer.observe($el)
    if (onLoadFromBottom && $el.getBoundingClientRect().top < 0 ) {
      addClass($el)
    }
  })
}

export default inViewClass