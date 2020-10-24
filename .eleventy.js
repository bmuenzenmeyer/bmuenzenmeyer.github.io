module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("default", "default.njk")

  //asset folders
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("img")

  // favicons
  eleventyConfig.addPassthroughCopy("favicon.ico")
  eleventyConfig.addPassthroughCopy("android-chrome-96x96.png")
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png")
  eleventyConfig.addPassthroughCopy("favicon-16x16.png")
  eleventyConfig.addPassthroughCopy("favicon-32x32.png")
  eleventyConfig.addPassthroughCopy("site.webmanifest")
  eleventyConfig.addPassthroughCopy("safari-pinned-tab.svg")

  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site", // Equivalent to Jekyll's destination property
    },
  }
}
