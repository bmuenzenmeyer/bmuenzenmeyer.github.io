const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginInlineLinkFavicon)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addLayoutAlias("default", "default.njk")

  //asset folders
  eleventyConfig.addPassthroughCopy("src/css")
  eleventyConfig.addPassthroughCopy("src/fonts")
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

  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger
  })

  eleventyConfig.addFilter("limit", (arr, limit = Infinity) => {
    if (limit < 0) {
      // Return the last N items.
      return arr.slice(limit)
    }
    // Return the first N items.
    return arr.slice(0, limit)
  })

  // rss
  eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822)

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
  }
}
