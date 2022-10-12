const pluginBetterSlug = require("@borisschapira/eleventy-plugin-better-slug")
const pluginRss = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(pluginBetterSlug)
  eleventyConfig.addPlugin(pluginRss)

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

  eleventyConfig.addNunjucksFilter("toDateObj", function (PANTOGRAPH_DATE) {
    return PANTOGRAPH_DATEtoDate(PANTOGRAPH_DATE)
  })

  eleventyConfig.addNunjucksFilter(
    "getNewestCollectionItemDateFromPANTOGRAPH_DATE",
    function (collections) {
      const words = collections.filter((c) => c.name === "words")

      const dates = words[0].cards.map((c) => {
        // console.log(c)
        return PANTOGRAPH_DATEtoDate(c.PANTOGRAPH_date)
      })

      // console.log(dates)

      const maxDate = new Date(Math.max(...dates))

      // console.log(maxDate)

      return maxDate
    }
  )

  eleventyConfig.addNunjucksFilter("mdToHTML", function (content) {
    return md.render(content)
  })

  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger
  })

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  }
}

const PANTOGRAPH_DATEtoDate = (PANTOGRAPH_DATE) => {
  if (!PANTOGRAPH_DATE) {
    return new Date(0, 0, 0)
  }
  // PANTOGRAPH_DATE is 'YYYY-MM-DD'
  const parts = PANTOGRAPH_DATE.split("-")
  return new Date(parts[0], parts[1] - 1, parts[2])
}
