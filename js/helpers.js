const helpers = () => {
  window.$ = window.$ || document.querySelector.bind(document)
  window.$$ = window.$$ || document.querySelectorAll.bind(document)
  window.clamp = (val, min, max) => val > max ? max : val < min ? min : val
  window.topInPage = $el => $el.getBoundingClientRect().top + window.scrollY
  window.bottomInPage = $el => $el.getBoundingClientRect().bottom + window.scrollY
}