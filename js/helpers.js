const helpers = () => {
  window.$ = document.querySelector.bind(document)
  window.$$ = document.querySelectorAll.bind(document)
  window.clamp = (val, min, max) => val > max ? max : val < min ? min : val
}