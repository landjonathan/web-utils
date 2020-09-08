import { slugify, camelToKebab, kebabToCamel, capitalize } from 'assets/utils/functions/stringManipulation'
export { slugify, camelToKebab, kebabToCamel, capitalize } from 'assets/utils/functions/stringManipulation'

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
 * @param {object[]} array
 * @param {string|number} key
 * @param {String[]} sortArray
 * @param {function} sortBy
 * @returns {Array}
 */
export const groupArrayOfObjectsByKey = (array, key, sortArray = [], sortBy = x => (a, b) => a) => array
  .sort((a, b) => sortArray.indexOf(a[key]) === -1 ? 1 : sortArray.indexOf(a[key]) - sortArray.indexOf(b[key]))
  .sort(sortBy)
  .reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {});

export const initHelpers = () => {
  window.$ = window.$ || document.querySelector.bind(document)
  window.$$ = window.$$ || document.querySelectorAll.bind(document)
  window.clamp = clamp
  window.topInPage = topInPage
  window.bottomInPage = bottomInPage
  window.slugify = slugify
}
