module.exports = function (eleventyConfig, pluginNamespace) {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addFilter('find', (array, key, value) => array.find(x => x[key] === value))
    eleventyConfig.addFilter('filter', (array, key, value) => array.filter(x => x[key] === value))
    eleventyConfig.addFilter('dataFromSlug', (array, slug) => array.find(x => x.fileSlug && x.fileSlug === slug).data)
  })
}