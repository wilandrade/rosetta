module.exports = (knex, Sentence) => {
  return params => {
    if (params.point > 0) {
      return knex("sentences")
        .where({ id: params.id })
        .increment("points", 1)
        .returning("id")
        .then(([id]) => {
          return knex("sentences")
            .where({ id })
            .select();
        })
        .then(sentences => new Sentence(sentences.pop()));
    } else {
      return knex("sentences")
        .where({ id: params.id })
        .decrement("points", 1)
        .returning("id")
        .then(([id]) => {
          return knex("sentences")
            .where({ id })
            .select();
        })
        .then(sentences => new Sentence(sentences.pop()));
    }
  };
};
