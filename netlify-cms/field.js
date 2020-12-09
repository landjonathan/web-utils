/**
 * Titleize a string
 * @param {string} name Original string
 * @return {string} Original string with the first letter uppercased
 */
const titleize = name => name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')

/**
 * @typedef {'boolean'|'code'|'color'|'datetime'|'file'|'hidden'|'image'|'list'|'map'|'markdown'|'number'|'object'|'relation'|'select'|'string'|'text'} Widget
 */

/**
 * Generates a generic field. Defaults to a 'string' if no widget declared. Defaults title to {@link titleize}d name.
 * @param {string} name The name of the field in code
 * @param {Widget=} widget
 * @param {string=} label
 * @param {boolean=} required
 * @param {boolean=} collapsed
 * @param {field|field[]=} fields
 * @param {string=} label_singular
 * @param {field=} field
 * @param defaultValue
 * @param {boolean=} allow_add
 * @param rest
 */
export const field = (name,
                      {
                        widget = 'string',
                        label,
                        required,
                        collapsed = false,
                        fields = [],
                        label_singular,
                        field,
                        defaultValue,
                        allow_add,
                        ...rest
                      } = {}) => {
  if (!label) {
    label = titleize(name)
  }

  if (typeof required === 'undefined')
    required = ['object', 'list'].includes(widget)

  const _field = {
    widget,
    name,
    label,
    required,
    collapsed,
    default: defaultValue,
    ...rest
  }

  if (fields.length)
    _field.fields = fields

  if (typeof field !== 'undefined')
    _field.field = field

  if (typeof label_singular !== 'undefined')
    _field.label_singular = label_singular


  if (typeof allow_add !== 'undefined')
    _field.allow_add = allow_add

  return _field
}

/**
 * Generates a required field
 * @param {string} name
 * @param {=} args
 * @return {field}
 */
export const required = (name, args) => field(name, { ...args, required: true })

/**
 * Generates a required string field. Defaults name to 'title'.
 * @param {string=} name
 * @param {=} args
 * @return {field}
 */
export const title = (name = 'title', args) => field(name, { ...args, required: true })

/**
 * Generates an object field.
 * @param {string} name
 * @param {field|field[]} fields
 * @param {=} args
 * @return {field}
 */
export const object = (name, fields, args) => required(name, {
  ...args,
  widget: 'object',
  fields
})

/**
 * Generates a list field.
 * Defaults singular label to the label with the last letter removed.
 * Defaults to collapsed.
 * @param {string} name
 * @param {field|field[]=} fields
 * @param {=} args
 * @return {field}
 */
export const list = (name, fields, args) => {
  const _args = {
    ...args,
    widget: 'list',
    collapsed: (typeof args === 'undefined' || typeof args.collapsed === 'undefined') ? true : args.collapsed,
    label_singular: (typeof args === 'undefined' || typeof args.label_singular === 'undefined') ? name.slice(0, -1) : args.label_singular
  }

  let _label_singular
  if (typeof args !== 'undefined') {
    if (typeof args.label_singular !== 'undefined') {
      _label_singular = args.label_singular
    } else if (typeof args.label !== 'undefined') {
      _label_singular = args.label.slice(0, -1)
    }
  } else {
    _label_singular = name.slice(0, -1)
  }

  _args.label_singular = _label_singular

  if (Array.isArray(fields))
    _args.fields = fields
  else
    _args.field = fields

  _args.minimize_collapsed = typeof args !== 'undefined' && typeof args.minimize_collapsed !== 'undefined' ? args.minimize_collapsed : true

  return required(name, _args)
}

/**
 * Generates an image field. Defaults name to 'image'.
 * @param {string} name
 * @param {=} args
 * @return {field}
 */
export const image = (name = 'image', args) => field(name, { ...args, widget: 'image' })

/**
 * Generates a text field. Defaults name to 'text'.
 * @param {string=} name
 * @param {=} args
 * @return {field}
 */
export const text = (name = 'text', args) => field(name, { ...args, widget: 'text' })

/**
 * Generates a minimal markdown field. Defaults name to 'text'. 
 * @param {string=} name
 * @param {=} args
 * @return {field}
 */
export const md = (name = 'text', args) => field(name, {
  widget: 'markdown',
  minimal: true,
  buttons: ['bold', 'italic', 'link', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'bulleted-list', 'numbered-list'],
  editorComponents: [], ...args,
})

/**
 * Generates a date field. Defaults name to 'date'.
 * @param {string=} name
 * @param {=} args
 * @return {field}
 */
export const date = (name = 'date', args) => field(name, {
  widget: 'datetime',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: false,
  format: 'x',
  ...args,
})

/**
 * Generates a boolean field.
 * @param {string} name
 * @param {=} args
 * @return {field}
 */
export const boolean = (name, args) => field(name, { widget: 'boolean', ...args })

/**
 * Generates an option, to be used inside a {@link select}.
 * @param value
 * @param label
 * @return {{label: string, value}}
 */
export const option = (value, label) => ({
  value,
  label: label || titleize(value)
})

/**
 * Generates a select field.
 * @param {string} name
 * @param {option[]} options Populated with {@link option}s.
 * @param {=} args
 * @return {field}
 */
export const select = (name, options, args) => field(name, {
  widget: 'select',
  options,
  ...args
})

/**
 * Generates a string field validated at a URL
 * @param {string} name
 * @param {=} args
 * @return {field}
 */
export const url = (name, args) => field(name, {
  pattern: ['https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)\n', 'Must be a valid URL'],
  ...args
})

/**
 * Generates a single page field. Defaults label to {@link titleize}d name. Defaults to a .yml file.
 * @param {string} name
 * @param {field[]} fields
 * @param {string=} label
 * @param {string} filename
 * @param {string} path
 * @param {string} folder
 * @param {string} extension
 * @return {page}
 */
export const page = (name, fields, { label, filename, path = 'src/content/', folder = 'pages', extension = 'yml' } = {}) => ({
  name,
  file: `${path}${folder}/${filename || name}.${extension}`,
  label: label || titleize(name),
  fields
})

/**
 * Generates a page in the data folder.
 * @param {string} name
 * @param {field[]} fields
 * @param {=} args
 * @return {page}
 */
export const settingsPage = (name, fields, args) => page(name, fields, {
  folder: 'data',
  ...args
})

/**
 * Generates a post type. Defaults label to {@link titleize}d name. Defaults to a .md file.
 * @param {string} name
 * @param {field[]} fields
 * @param {string=} label
 * @param {string} path
 * @param {string} subfolder
 * @param {string} slug
 * @param {=} args
 * @return {postType}
 */
export const postType = (name, fields, { label, path = 'src/content', subfolder = '', slug = '{{slug}}', ...args } = {}) => ({
  name,
  folder: `${path}${subfolder || ''}/${name}`,
  label: label || titleize(name),
  fields,
  editor: { preview: false },
  label_singular: (typeof args === 'undefined' || typeof args.label_singular === 'undefined') ? name.slice(0, -1) : args.label_singular,
  create: true,
  slug,
})