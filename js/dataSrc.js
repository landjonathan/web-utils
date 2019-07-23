const dataSrc = () => {
  document.querySelectorAll('[data-src]').forEach(el => {
    el.setAttribute('src', el.getAttribute('data-src'))
    el.removeAttribute('data-src')
  })
}