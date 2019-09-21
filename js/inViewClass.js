const inViewClass = (
  {
    dataIdentifier = 'data-in-view-class',
    defaultClassName = 'in-view',
    rootMargin = '-1px',
    threshold = .25
  } = {},
) => {
  const observer = new IntersectionObserver(entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.add(entry.target.getAttribute(dataIdentifier) || defaultClassName)
    }), { rootMargin, threshold })

  document.querySelectorAll(`[${dataIdentifier}]`).forEach($el => {
    observer.observe($el)
  })
}