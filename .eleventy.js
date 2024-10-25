const { DateTime } = require("luxon");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  eleventyConfig.addFilter("dateIso", (date) => {
    return DateTime.fromJSDate(date).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return DateTime.fromJSDate(date).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("slugify", function(input) {
    return slugify(input, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
