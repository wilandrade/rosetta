const moment = require("moment");

const Sentence = function (row) {
  this.id = row.id;
  this.username = row.username;
  this.englishText = row.en_text;
  this.japaneseText = row.jp_text || "";
  this.createdAt = new Date(row.created_at);
};

Sentence.prototype.serialize = function () {
  return {
    id: this.id,
    username: this.username,
    englishText: this.englishText,
    japaneseText: this.japaneseText,
    createdAt: moment(this.createdAt).fromNow(),
  };
};

module.exports = (knex) => {
  return {
    list: require("./list_sentences")(knex, Sentence),
  };
};