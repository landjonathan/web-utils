/**
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const clamp = (val, min = 0, max = Infinity) => val > max ? max : val < min ? min : val


/**
 * @param {HTMLElement} $el
 * @returns {number}
 */
export const topInPage = $el => $el.getBoundingClientRect().top + window.scrollY


/**
 * @param {HTMLElement} $el
 * @returns {number}
 */
export const bottomInPage =  $el => $el.getBoundingClientRect().bottom + window.scrollY


/**
 * {@link https://gist.github.com/mathewbyrne/1280286/731b33268f7d8aea972a5aeef2c345496e8e5b18}
 *
 * @param {string} text
 * @returns {string}
 */
export const slugify = text => text.toString().toLowerCase()
  .replace(/(\w)'/g, '$1')           // Special case for apostrophes
  .replace(/[^a-z0-9_\-]+/g, '-')     // Replace all non-word chars with -
  .replace(/--+/g, '-')             // Replace multiple - with single -
  .replace(/^-+/, '')                 // Trim - from start of text
  .replace(/-+$/, '')                // Trim - from end of text


/**
 * Convert an array of objects to a single object.
 *
 * `f([{id: 1, foo: bar}, {id: 2, baz: bar}], 'id')` -> `{1:{id:1, foo: bar},2:{id:2, baz: bar}}`
 *
 * {@link https://1loc.dev/#convert-an-array-of-objects-to-a-single-object}
 *
 * @param {Object[]} array
 * @param {string} key
 * @returns {Object}
 */
export const arrayOfObjectsToObjectByKey = (array, key) => array.reduce((a, b) => ({ ...a, [b[key]]: b }), {})


/**
 * Group an array of objects by a key
 *
 * {@link https://1loc.dev/#group-an-array-of-objects-by-a-key}
 *
 * @param {this} array
 * @param {string|number} key
 * @param {String[]} sortArray
 * @param {function} sortBy
 * @returns {Array}
 */
export const groupArrayOfObjectsByKey = (array, key, sortArray = [], sortBy = x => (a, b) => a) => array
  .sort((a, b) => sortArray.indexOf(a[key]) === -1 ? 1 : sortArray.indexOf(a[key]) - sortArray.indexOf(b[key]))
  .sort(sortBy)
  .reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {});


/**
 * {@link https://1loc.dev/#convert-camel-case-to-kebab-case-and-vice-versa}
 * @param {string} string
 * @returns {string}
 */
export const kebabToCamel = string => string.replace(/-./g, m => m.toUpperCase()[1])

/**
 * {@link https://1loc.dev/#convert-camel-case-to-kebab-case-and-vice-versa}
 * @param {string} string
 * @returns {string}
 */
export const camelToKebab = string => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const initHelpers = () => {
  window.$ = window.$ || document.querySelector.bind(document)
  window.$$ = window.$$ || document.querySelectorAll.bind(document)
  window.clamp = clamp
  window.topInPage = topInPage
  window.bottomInPage = bottomInPage
  window.slugify = slugify
}
