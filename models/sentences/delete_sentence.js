module.exports = (knex, Sentence) => {
  return async id => {
    const node = await knex("sentences")
      .where("id", id)
      .select()
      .then(rows => new Sentence(rows.pop()));

    return knex("sentences")
      .where("id", id)
      .del()
      .then(() => node);
  };
};
