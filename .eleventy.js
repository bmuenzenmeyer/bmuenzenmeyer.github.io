const pluginBetterSlug = require("@borisschapira/eleventy-plugin-better-slug")

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(pluginBetterSlug)

  eleventyConfig.addLayoutAlias("default", "default.njk")

  //asset folders
  eleventyConfig.addPassthroughCopy("src/css")
  eleventyConfig.addPassthroughCopy("src/img")

  // favicons
  eleventyConfig.addPassthroughCopy("src/favicon.ico")
  eleventyConfig.addPassthroughCopy("src/android-chrome-96x96.png")
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png")
  eleventyConfig.addPassthroughCopy("src/favicon-16x16.png")
  eleventyConfig.addPassthroughCopy("src/favicon-32x32.png")
  eleventyConfig.addPassthroughCopy("src/site.webmanifest")
  eleventyConfig.addPassthroughCopy("src/safari-pinned-tab.svg")

  // A handy markdown shortcode for blocks of markdown
  // coming from our data sources
  const markdownIt = require("markdown-it")
  const md = new markdownIt({
    html: true,
  })
  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content)
  })

  // Simply inline minified CSS
  const CleanCSS = require("clean-css")
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addNunjucksFilter("toHumanUrl", (v) =>
    v.replace(/\//g, "").replace(/-/g, " ")
  )

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
}
