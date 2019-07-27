module.exports = function(knex) {
  return {
    sentences: require("./sentences")(knex)
  };
};
