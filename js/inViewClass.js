const inViewClass = (dataString = 'data-in-view-class', defaultClassName = 'in-view') => {
  const observer = new IntersectionObserver(entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.add(entry.target.getAttribute(dataString) || defaultClassName)
    }), { rootMargin: '-1px', threshold: .25 })

  document.querySelectorAll('[data-in-view-class').forEach($el => {
    observer.observe($el)
  })
}