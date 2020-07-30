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

// https://1loc.dev/#convert-an-array-of-objects-to-a-single-object
// Convert an array of objects to a single object
// e.g. f([{id: 1, foo: bar}, {id: 2, baz: bar}], 'id') -> {1:{id:1, foo: bar},2:{id:2, baz: bar}}
export const arrayOfObjectsToObjectByKey = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {})

// https://1loc.dev/#group-an-array-of-objects-by-a-key
// Group an array of objects by a key
export const groupArrayOfObjectsByKey = (arr, key) => arr.reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {});

// https://1loc.dev/#convert-camel-case-to-kebab-case-and-vice-versa
export const kebabToCamel = str => str.replace(/-./g, m => m.toUpperCase()[1])
export const camelToKebab = str => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const initHelpers = () => {
  window.$ = window.$ || document.querySelector.bind(document)
  window.$$ = window.$$ || document.querySelectorAll.bind(document)
  window.clamp = clamp
  window.topInPage = topInPage
  window.bottomInPage = bottomInPage
  window.slugify = slugify
}
