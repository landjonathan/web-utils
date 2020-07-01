const md = require('markdown-it')({
  html: true
})

module.exports = function (eleventyConfig, pluginNamespace) {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addFilter('p', string => string.split('\n\n').map(p => `<p>${p}</p>`).join('').replace(/\n/g, '<br>'))
    eleventyConfig.addFilter('md', string => string && md.render(string))
  })
}