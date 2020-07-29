export const clamp = (val, min, max) => val > max ? max : val < min ? min : val
export const topInPage = $el => $el.getBoundingClientRect().top + window.scrollY
export const bottomInPage =  $el => $el.getBoundingClientRect().bottom + window.scrollY

// https://gist.github.com/mathewbyrne/1280286/731b33268f7d8aea972a5aeef2c345496e8e5b18
export const slugify = text => text.toString().toLowerCase()
  .replace(/(\w)'/g, '$1')           // Special case for apostrophes
  .replace(/[^a-z0-9_\-]+/g, '-')     // Replace all non-word chars with -
  .replace(/--+/g, '-')             // Replace multiple - with single -
  .replace(/^-+/, '')                 // Trim - from start of text
  .replace(/-+$/, '')                // Trim - from end of text

export const initHelpers = () => {
  window.$ = window.$ || document.querySelector.bind(document)
  window.$$ = window.$$ || document.querySelectorAll.bind(document)
  window.clamp = clamp
  window.topInPage = topInPage
  window.bottomInPage = bottomInPage
  window.slugify = slugify
}
