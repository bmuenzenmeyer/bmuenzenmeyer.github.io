function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("default", "layouts/default.hbs");

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addShortcode("randomItem", function() {
    const a = new Array(getRandomInt(3)).fill("");
    return a.reduce((i, s) => `${s}<div class='item'></div>`, "");
  });

  eleventyConfig.addHandlebarsHelper("reverseArray", function(arr) {
    arr.reverse();
  });

  eleventyConfig.addHandlebarsHelper("ifIn", function(elem, list, options) {
    if (list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site" // Equivalent to Jekyll's destination property
    }
  };
};
