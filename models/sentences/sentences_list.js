module.exports = (knex, Sentence) => {
  return () => {
    return knex("sentences")
      .select("*")
      .then(dbSentences => {
        return dbSentences.map(dbSentence => new Sentence(dbSentence));
      });
  };
};
