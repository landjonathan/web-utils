const titleize = name => name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')

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

export const required = (name, args) => field(name, { ...args, required: true })

export const title = (name = 'title', args) => field(name, { ...args, required: true })

export const object = (name, fields, args) => required(name, {
  ...args,
  widget: 'object',
  fields
})

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

export const image = (name = 'image', args) => field(name, { ...args, widget: 'image' })

export const text = (name = 'text', args) => field(name, { ...args, widget: 'text' })

export const md = (name = 'text', args) => field(name, {
  widget: 'markdown',
  minimal: true,
  buttons: ['bold', 'italic', 'link', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'bulleted-list', 'numbered-list'],
  editorComponents: [], ...args,
})

export const date = (name = 'date', args) => field(name, {
  widget: 'datetime',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: false,
  format: 'x',
  ...args,
})

export const boolean = (name, args) => required(name, { widget: 'boolean', ...args })

export const page = (name, fields, { label, filename, path = 'src/content/', folder = 'pages', extension = 'yml' } = {}) => ({
  name,
  file: `${path}${folder}/${filename || name}.${extension}`,
  label: label || titleize(name),
  fields
})