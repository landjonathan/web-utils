export const splitParagraphs = {
  name: 'splitParagraphs',
  functional: true,
  props: {
    tag: { type: String, default: 'p' },
  },
  render: (createElement, { children, data, props }) =>
    (children ? children[0].text : data.domProps.textContent)
      .split('\n\n')
      .map(p => createElement(props.tag,
        null,
        // https://github.com/inouetakuya/vue-nl2br/blob/master/src/Nl2br.js
        p.split('\n').reduce((accumulator, string) => {
          if (!Array.isArray(accumulator)) {
            return [accumulator, createElement('br'), string]
          }
          return accumulator.concat([createElement('br'), string])
        }))
      )
}

export default {
  components: {
    splitParagraphs
  },
  methods: {
    htmlParagraphs: text => text.split('\n\n').map(p => `<p>${p}</p>`).join('').replace(/\n/g, '<br>')
  },
}
