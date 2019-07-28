const validateSentence = sentence => sentence.en_text || sentence.jp_text;

module.exports = (knex, Sentence) => {
  return params => {
    if (!validateSentence(params)) {
      return Promise.reject(
        new Error("Either an English or Japanese sentence must be provided.")
      );
    }

    const newRow = {
      username: params.username,
      en_text: params.en_text,
      jp_text: params.jp_text,
      tag: params.tag,
      points: 0 //every sentence starts with 0 points.
    };

    return knex("sentences")
      .insert(newRow)
      .returning("id")
      .then(([id]) => {
        return knex("sentences")
          .where({ id })
          .select();
      })
      .then(sentences => new Sentence(sentences.pop()))
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That sentence already exists"));

        return Promise.reject(err);
      });
  };
};
