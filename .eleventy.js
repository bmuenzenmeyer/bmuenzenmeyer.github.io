module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("default", "layouts/default.hbs");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site" // Equivalent to Jekyll's destination property
    }
  };
};
